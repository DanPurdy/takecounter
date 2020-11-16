import ContainerHandler, {
  ContainerStatus,
} from './components/ContainerHandler';
import ElementHandler from './components/ElementHandler';
import Counter from './components/Counter';
import MessageHandler, { StateMessage } from './components/MessageHandler';

interface TakeCounterOptions {
  controls: {
    incrementTake?: string;
    decrementTake?: string;
    selectTake?: string;
    incrementPass?: string;
    decrementPass?: string;
    intiateNewPass?: string;
    togglePassVisible?: string;
    resetAndClear?: string;
  };
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
    this.passContainer = new ContainerHandler(elements.passContainer);
    this.takeContainer = new ContainerHandler(elements.takeContainer);
    this.passElement = new ElementHandler(elements.passElement);
    this.takeElement = new ElementHandler(elements.takeElement);
    this.message = new MessageHandler(StateMessage.NEXT, elements.stateElement);

    this.take = 1;
    this.pass = 1;
    this.options = {
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
    this.passes = new Counter(this.take);
    this.takes = new Counter(this.take);
    this.initialiseHandlers(this.options);
  }

  set take(value: number) {
    this.takeElement.set(value);
  }

  set pass(value: number) {
    this.passElement.set(value);
  }

  initialiseHandlers(options: TakeCounterOptions) {
    try {
      window.onkeydown = (event: KeyboardEvent) => {
        const registeredKey = Object.keys(options).find(
          (key) => options[key] === event.code,
        );

        if (registeredKey) {
          this[registeredKey]();
        }
      };
    } catch (err) {
      console.error(err);
    }
  }

  incrementTake() {
    this.take = this.takes.incrementCount();
    this.message.setNextMessage();
  }

  decrementTake() {
    this.take = this.takes.decrementCount();
    this.message.setCurrentMessage();
  }

  selectTake() {
    this.takes.count = parseInt(prompt('Take?'), 10) || this.takes.count;
  }

  incrementPass() {
    this.passes.incrementCount();
    this.message.setNextMessage();
  }

  decrementPass() {
    this.passes.decrementCount();
    this.message.setCurrentMessage();
  }

  intiateNewPass() {
    this.passes.incrementCount();
    this.takes.reset();
    this.message.setNextMessage();
  }

  togglePassVisible() {
    if (this.passContainer.status === ContainerStatus.HIDDEN) {
      this.passContainer.show();
    } else {
      this.passContainer.hide();
    }
  }

  resetAndClear() {
    this.takes.reset();
    this.passes.reset();
    this.message.setNextMessage();
  }
}
