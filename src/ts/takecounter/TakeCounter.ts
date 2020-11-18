/// <reference path="./module.d.ts" />

import ContainerHandler from './components/ContainerHandler';
import ElementHandler from './components/ElementHandler';
import Counter from './components/Counter';
import MessageHandler, { StateMessage } from './components/MessageHandler';
import { FULL_WIDTH_CLASSNAME, HIDDEN_CLASSNAME } from './const';

export default class TakeCounter {
  passes: Counter;
  passContainer: ContainerHandler;
  passElement: ElementHandler;
  message: MessageHandler;
  options: TakeCounterOptions;
  takeContainer: ContainerHandler;
  takeElement: ElementHandler;
  takes: Counter;

  constructor(
    elements: TakeCounterElements,
    options: TakeCounterOptions = { controls: {} },
  ) {
    // Validate all the elements exists that we need
    this._validateElements(elements);
    const {
      initialPass,
      initialTake,
      maxPassCount,
      maxTakeCount,
      minPassCount,
      minTakeCount,
      modifiers: { hiddenClassName, fullWidthClassName },
    } = this._initOptions(options);

    // Setup our containers
    this.passContainer = new ContainerHandler(
      elements.passContainer,
      !!this?.options?.hidePassOnStartup,
      false,
      hiddenClassName,
      fullWidthClassName,
    );
    this.takeContainer = new ContainerHandler(
      elements.takeContainer,
      false,
      this?.options?.hidePassOnStartup, // make default full width if passes are hidden
      hiddenClassName,
      fullWidthClassName,
    );
    this.message = new MessageHandler(elements.stateElement, StateMessage.NEXT);

    // Initialise the pass and take counters
    this.passes = new Counter(
      elements.passElement,
      initialPass,
      maxPassCount,
      minPassCount,
    );
    this.takes = new Counter(
      elements.takeElement,
      initialTake,
      maxTakeCount,
      minTakeCount,
    );

    // Setup our controls and initial state
    this._initialiseHandlers(this.options.controls);
  }

  get take() {
    return this?.takes?.count || this.options.initialTake;
  }

  get pass() {
    return this?.passes?.count || this.options.initialPass;
  }

  // Ensure all elements are defined and exist in the DOM
  private _validateElements(elements: TakeCounterElements): void {
    for (const key of Object.keys(elements)) {
      if (elements[key] === null) {
        // TODO replace with custom UI
        alert(`Element ${key} does not exist - please try again`);
        throw new Error(`Element ${key} is missing`);
      }
    }
  }

  private _initOptions(options: TakeCounterOptions): TakeCounterOptions {
    return (this.options = {
      hidePassOnStartup: false,
      initialPass: 1,
      initialTake: 1,
      maxPassCount: 999,
      minPassCount: 1,
      maxTakeCount: 9999,
      minTakeCount: 1,
      resetTakeOnNewPass: false,
      ...options,
      controls: {
        incrementTake: 'NumpadAdd',
        decrementTake: 'NumpadSubtract',
        selectTake: 'NumpadMultiply',
        incrementPass: 'Numpad6',
        decrementPass: 'Numpad9',
        intiateNewPass: 'Numpad7',
        togglePassVisible: 'Numpad4',
        resetAndClear: 'NumpadDecimal',
        ...options.controls,
      },
      modifiers: {
        hiddenClassName: HIDDEN_CLASSNAME,
        fullWidthClassName: FULL_WIDTH_CLASSNAME,
        ...options.modifiers,
      },
    });
  }

  private _initialiseHandlers(controls: TakeCounterControls): void {
    try {
      window.onkeydown = (event: KeyboardEvent) => {
        const registeredKey = Object.keys(controls).find(
          (key) => controls[key] === event.code,
        );

        if (registeredKey) {
          this[registeredKey]();
        }
      };
    } catch (err) {
      console.error(err);
    }
  }

  /** Reset the take to the initialTake value and set the state to 'NEXT'  */
  resetTake() {
    this.takes.reset();
    this.message.setNextMessage();
  }

  /** Increment the current take count if the current state is 'CURRENT' and set the state to 'NEXT'. If the state is 'NEXT' then enter 'CURRENT' state and do not increment the take */
  incrementTake(): void {
    if (
      this.takes.count === this.options.maxTakeCount &&
      this.message.current === StateMessage.CURRENT
    ) {
      return;
    }

    if (this.message.current === StateMessage.CURRENT) {
      this.takes.incrementCount();
      this.message.setNextMessage();
    } else {
      this.message.setCurrentMessage();
    }
  }

  /** Decrement the current take count or reset the state message to 'NEXT' if in a 'CURRENT' state */
  decrementTake() {
    // TODO legacy mode
    if (this.message.current === StateMessage.CURRENT) {
      this.message.setNextMessage();
    } else {
      this.takes.decrementCount();
    }
  }

  /** Prompt user to enter a take number between the initialTake value and maxTakeCount */
  selectTake() {
    // TODO replace with custom UI
    this.takes.set(
      parseInt(
        prompt(
          `Select a take: ${this.options.initialTake} - ${this.options.maxTakeCount}`,
        ),
        10,
      ),
    );
  }

  /** Increment the current pass count only if the pass container is visible */
  incrementPass() {
    if (!this.passContainer.isVisible) {
      return;
    }

    this.passes.incrementCount();

    if (this.options.resetTakeOnNewPass) {
      this.resetTake();
    }
  }

  /** Decrement the current pass count */
  decrementPass() {
    if (!this.passContainer.isVisible) {
      return;
    }

    this.passes.decrementCount();
  }

  /** When starting a new pass increment the count. If resetTakeOnNewPass is set for legacy reasons then the take will be reset to 1 */
  intiateNewPass() {
    this.passes.incrementCount();

    if (this.options.resetTakeOnNewPass) {
      this.resetTake();
    }
  }

  /** Toggle whether the pass container should be visible or not. The pass container is a legacy feature that may not always be needed */
  togglePassVisible() {
    this.passContainer.toggle();
    this.passContainer.isVisible
      ? this.takeContainer.removeIsProminent()
      : this.takeContainer.setIsProminent();
  }

  /** Confirm the user wishes to reset and then reset takes, passes and the state message */
  resetAndClear() {
    // TODO replace with custom UI
    if (confirm('Reset?')) {
      this.passes.reset();
      this.resetTake();
    }
  }
}
