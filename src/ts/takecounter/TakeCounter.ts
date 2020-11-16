import ContainerHandler from './components/ContainerHandler';
import ElementHandler from './components/ElementHandler';
import Counter from './components/Counter';
import MessageHandler, { StateMessage } from './components/MessageHandler';

interface TakeCounterControls {
  incrementTake?: string;
  decrementTake?: string;
  selectTake?: string;
  incrementPass?: string;
  decrementPass?: string;
  intiateNewPass?: string;
  togglePassVisible?: string;
  resetAndClear?: string;
}

interface TakeCounterOptions {
  controls?: TakeCounterControls;
  hidePassOnStartup?: boolean;
  resetTakeOnNewPass?: boolean;
}

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
    elements: {
      passContainer: HTMLElement;
      passElement: HTMLElement;
      takeContainer: HTMLElement;
      takeElement: HTMLElement;
      stateElement: HTMLElement;
    },
    options: TakeCounterOptions = { controls: {} },
  ) {
    this.options = {
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
    };
    this.passContainer = new ContainerHandler(
      elements.passContainer,
      !!this?.options?.hidePassOnStartup,
    );
    this.takeContainer = new ContainerHandler(elements.takeContainer);
    this.message = new MessageHandler(StateMessage.NEXT, elements.stateElement);
    this.passes = new Counter(1, elements.passElement);
    this.takes = new Counter(1, elements.takeElement);

    this.initialiseHandlers(this.options.controls);
  }

  get take() {
    return this?.takes?.count || 1;
  }

  get pass() {
    return this?.passes?.count || 1;
  }

  initialiseHandlers(controls: TakeCounterControls) {
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

  resetTake() {
    this.takes.reset();
    this.message.setNextMessage();
  }

  incrementTake() {
    if (this.message.current === StateMessage.CURRENT) {
      this.takes.incrementCount();
      this.message.setNextMessage();
    } else {
      this.message.setCurrentMessage();
    }
  }

  decrementTake() {
    this.takes.decrementCount();
    this.message.setCurrentMessage();
  }

  selectTake() {
    // TODO replace with UI
    this.takes.set(parseInt(prompt('Take?'), 10));
  }

  incrementPass() {
    this.passes.incrementCount();

    if (this.options.resetTakeOnNewPass) {
      this.resetTake();
    }
  }

  decrementPass() {
    this.passes.decrementCount();
    this.message.setCurrentMessage();
  }

  intiateNewPass() {
    this.passes.incrementCount();

    if (this.options.resetTakeOnNewPass) {
      this.resetTake();
    }
  }

  togglePassVisible() {
    this.passContainer.toggle();
  }

  resetAndClear() {
    this.takes.reset();
    this.passes.reset();
    this.message.setNextMessage();
  }
}
