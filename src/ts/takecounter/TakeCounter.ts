import { ContainerHandler } from './components/ContainerHandler';
import { Counter } from './components/Counter';
import { MessageHandler, StateMessage } from './components/MessageHandler';
import { HistoryManager } from './components/HistoryManager';
import { DEFAULT_OPTIONS } from '../constants';

export default class TakeCounter {
  private _passContainer: ContainerHandler;
  private _takeContainer: ContainerHandler;
  private _message: MessageHandler;
  private _options: TakeCounterOptions;
  private _historyManager: HistoryManager;
  readonly passes: Counter;
  readonly takes: Counter;

  constructor(
    elements: TakeCounterElements,
    options: TakeCounterOptions = { controls: {}, modifiers: {} },
  ) {
    // Validate all the elements exists that we need
    this._validateElements(elements);

    // Check our local storage historical state and if found, whether the user wants to load
    this._historyManager = new HistoryManager();
    const overrides: TakeCounterOptions = { controls: {}, modifiers: {} };

    if (this._historyManager.checkAndLoadHistoricalData()) {
      const {
        pass: historicalPass,
        take: historicalTake,
      } = this._historyManager.latestPassAndTake;

      overrides.initialPass = historicalPass;
      overrides.initialTake = historicalTake;
    }

    const {
      initialPass,
      initialTake,
      maxPassCount,
      maxTakeCount,
      minPassCount,
      minTakeCount,
      modifiers: { activeClassName, hiddenClassName, fullWidthClassName },
    } = this._initOptions(options, overrides);

    // Set our history state with our initial value (kinda redundant if we loaded from history but won't harm to set exact same values again)
    this._historyManager.set(initialPass, initialTake);

    // Setup our containers
    this._passContainer = new ContainerHandler(
      elements.passContainer,
      this._options.hidePassOnStartup,
      false,
      hiddenClassName,
      fullWidthClassName,
    );
    this._takeContainer = new ContainerHandler(
      elements.takeContainer,
      false,
      this._options.hidePassOnStartup, // make default full width if passes are hidden
      hiddenClassName,
      fullWidthClassName,
    );
    this._message = new MessageHandler(
      elements.stateElement,
      StateMessage.NEXT,
      activeClassName,
    );

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
    this._initialiseHandlers(this._options.controls);
  }

  get take() {
    return this.takes.count;
  }

  get pass() {
    return this.passes.count;
  }

  get options() {
    return this._options;
  }

  get history() {
    return this._historyManager.state;
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

  private _initOptions(
    options: TakeCounterOptions,
    overrides: TakeCounterOptions,
  ): TakeCounterOptions {
    return (this._options = {
      ...DEFAULT_OPTIONS,
      ...options,
      ...overrides,
      controls: {
        ...DEFAULT_OPTIONS.controls,
        ...options.controls,
        ...overrides.controls,
      },
      modifiers: {
        ...DEFAULT_OPTIONS.modifiers,
        ...options.modifiers,
        ...overrides.modifiers,
      },
    });
  }

  private _initialiseHandlers(controls: TakeCounterControls): void {
    window.onkeydown = (event: KeyboardEvent) => {
      const registeredKey = Object.keys(controls).find(
        (key) => controls[key] === event.code,
      );

      if (registeredKey) {
        this[registeredKey]();
      }
    };
  }

  /** Reset the take to the initialTake value and set the state to 'NEXT' */
  resetTake() {
    this.takes.reset();
    this._message.setNextMessage();

    this._historyManager.set(this.pass, this.take);
  }

  /** Increment the current take count if the current state is 'CURRENT' and set the state to 'NEXT'. If the state is 'NEXT' then enter 'CURRENT' state and do not increment the take */
  incrementTake(): void {
    if (
      this.takes.count === this._options.maxTakeCount &&
      this._message.current === StateMessage.CURRENT
    ) {
      return;
    }

    if (this._message.current === StateMessage.CURRENT) {
      this.takes.incrementCount();
      this._message.setNextMessage();
      this._historyManager.set(this.pass, this.take);
    } else {
      this._message.setCurrentMessage();
    }
  }

  /** Decrement the current take count or reset the state message to 'NEXT' if in a 'CURRENT' state */
  decrementTake() {
    // TODO legacy mode
    if (this._message.current === StateMessage.CURRENT) {
      this._message.setNextMessage();
    } else {
      this.takes.decrementCount();
      this._historyManager.set(this.pass, this.take);
    }
  }

  /** Prompt user to enter a take number between the initialTake value and maxTakeCount */
  selectTake() {
    // TODO replace with custom UI
    this.takes.set(
      parseInt(
        prompt(
          `Select a take: ${this._options.initialTake} - ${this._options.maxTakeCount}`,
        ),
        10,
      ),
    );

    this._historyManager.set(this.pass, this.take);
  }

  /** Increment the current pass count only if the pass container is visible */
  incrementPass() {
    if (!this._passContainer.isVisible) {
      return;
    }

    this.passes.incrementCount();

    if (this._options.resetTakeOnNewPass) {
      this.resetTake();
    }

    if (!this._options.disablePassHistoryLoad) {
      try {
        this.takes.set(this._historyManager.load(this.pass));
      } catch (err) {
        this._historyManager.set(this.pass, this.take);
      }
    } else {
      this._historyManager.set(this.pass, this.take);
    }
  }

  /** Decrement the current pass count */
  decrementPass() {
    if (!this._passContainer.isVisible) {
      return;
    }

    this.passes.decrementCount();

    if (!this._options.disablePassHistoryLoad) {
      try {
        this.takes.set(this._historyManager.load(this.pass));
      } catch (err) {
        this._historyManager.set(this.pass, this.take);
      }
    } else {
      this._historyManager.set(this.pass, this.take);
    }
  }

  /** When starting a new pass increment the count. If resetTakeOnNewPass is set for legacy reasons then the take will be reset to 1 */
  initiateNewPass() {
    this.passes.incrementCount();

    if (this._options.resetTakeOnNewPass) {
      this.resetTake();
    }

    this._historyManager.set(this.pass, this.take);
  }

  /** Toggle whether the pass container should be visible or not. The pass container is a legacy feature that may not always be needed */
  togglePassVisible() {
    this._passContainer.toggle();
    this._passContainer.isVisible
      ? this._takeContainer.removeIsProminent()
      : this._takeContainer.setIsProminent();
  }

  /** Confirm the user wishes to reset and then reset takes, passes and the state message */
  resetAndClear() {
    // TODO replace with custom UI
    if (confirm('Reset?')) {
      this.takes.reset(false);
      this.passes.reset(false);
      this._message.setNextMessage();
      this._historyManager.set(this.pass, this.take);
    }
  }
}
