import {
  DEFAULT_OPTIONS,
  HIDDEN_CLASSNAME,
  FULL_WIDTH_CLASSNAME,
  LOCALSTORAGE_HISTORY_KEY,
} from '../../constants';
import { StateMessage } from '../components/MessageHandler';
import TakeCounter from '../TakeCounter';

const DEFAULT_TEST_STATE = { 1: 10, 2: 20 };

function getDefaultElements(): TakeCounterElements {
  const newElement = document.createElement('div');
  newElement.classList.add('exists');
  document.body.appendChild(newElement);

  return {
    passContainer: document.querySelector('.exists'),
    passElement: document.querySelector('.exists'),
    takeContainer: document.querySelector('.exists'),
    takeElement: document.querySelector('.exists'),
    stateElement: document.querySelector('.exists'),
  };
}

describe('TakeCounter', () => {
  afterEach(() => {
    window?.localStorage?.clear();
    jest.resetAllMocks();
  });

  it('should throw an element not found error if we dont pass valid selectors to the elements options', () => {
    try {
      const takeCounter = new TakeCounter({
        passContainer: document.querySelector('.not-exists'),
        passElement: document.querySelector('.not-exists'),
        takeContainer: document.querySelector('.not-exists'),
        takeElement: document.querySelector('.not-exists'),
        stateElement: document.querySelector('.not-exists'),
      });
    } catch (err) {
      expect(err?.message).toEqual(`Element passContainer is missing`);
    }
  });

  it('should throw an element not found error if we dont pass a single valid selector to the elements options', () => {
    const newElement = document.createElement('div');
    newElement.classList.add('exists');
    document.body.appendChild(newElement);

    try {
      const takeCounter = new TakeCounter({
        passContainer: document.querySelector('.exists'),
        passElement: document.querySelector('.exists'),
        takeContainer: document.querySelector('.exists'),
        takeElement: document.querySelector('.exists'),
        stateElement: document.querySelector('.not-exists'),
      });
    } catch (err) {
      expect(err?.message).toEqual(`Element stateElement is missing`);
    }
  });

  it('should correctly setup the default options', () => {
    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    expect(takeCounter.options).toMatchObject(DEFAULT_OPTIONS);
  });

  it('should merge our passed options correctly', () => {
    const newOptions = {
      hidePassOnStartup: true,
      controls: {
        incrementTake: 'Numpad7',
      },
      modifiers: {
        activeClassName: 'test',
      },
    };

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        ...newOptions,
      },
    );

    expect(takeCounter.options).toMatchObject({
      ...DEFAULT_OPTIONS,
      ...newOptions,
      controls: { ...DEFAULT_OPTIONS.controls, ...newOptions.controls },
      modifiers: { ...DEFAULT_OPTIONS.modifiers, ...newOptions.modifiers },
    });
  });

  it('should initialise the take and pass counters', () => {
    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    expect(takeCounter.takes).toBeDefined();
    expect(takeCounter.passes).toBeDefined();
    expect(takeCounter.takes.count).toEqual(1);
    expect(takeCounter.passes.count).toEqual(1);

    expect(takeCounter.takes.count).toEqual(takeCounter.take);
    expect(takeCounter.passes.count).toEqual(takeCounter.pass);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should initialise the take and pass counters with the correct history if user chooses to load it', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValue(true);

    window.localStorage.setItem(
      LOCALSTORAGE_HISTORY_KEY,
      JSON.stringify(DEFAULT_TEST_STATE),
    );
    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    expect(takeCounter.options.initialPass).toBe(2);
    expect(takeCounter.options.initialTake).toBe(20);

    expect(takeCounter.takes).toBeDefined();
    expect(takeCounter.passes).toBeDefined();
    expect(takeCounter.takes.count).toEqual(20);
    expect(takeCounter.passes.count).toEqual(2);

    expect(takeCounter.takes.count).toEqual(takeCounter.take);
    expect(takeCounter.passes.count).toEqual(takeCounter.pass);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should initialise the take and pass counters with the correct history if user chooses not to load it', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValue(true);

    window.localStorage.setItem(
      LOCALSTORAGE_HISTORY_KEY,
      JSON.stringify(DEFAULT_TEST_STATE),
    );
    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    expect(takeCounter.options.initialPass).toBe(2);
    expect(takeCounter.options.initialTake).toBe(20);

    expect(takeCounter.takes).toBeDefined();
    expect(takeCounter.passes).toBeDefined();
    expect(takeCounter.takes.count).toEqual(20);
    expect(takeCounter.passes.count).toEqual(2);

    expect(takeCounter.takes.count).toEqual(takeCounter.take);
    expect(takeCounter.passes.count).toEqual(takeCounter.pass);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should not allow us to increment the pass counter if the pass counter is not visible', () => {
    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        hidePassOnStartup: true,
      },
    );

    expect(takeCounter.pass).toEqual(1);

    takeCounter.incrementPass();
    takeCounter.incrementPass();

    expect(takeCounter.pass).toEqual(1);
  });

  it('should not allow us to decrement the pass counter if the pass counter is not visible', () => {
    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        hidePassOnStartup: true,
        initialPass: 3,
      },
    );

    expect(takeCounter.pass).toEqual(3);

    takeCounter.decrementPass();
    takeCounter.decrementPass();

    expect(takeCounter.pass).toEqual(3);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should allow us to increment the pass counter if the pass counter is visible', () => {
    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        hidePassOnStartup: false,
      },
    );

    expect(takeCounter.pass).toEqual(1);

    takeCounter.incrementPass();
    takeCounter.incrementPass();

    expect(takeCounter.pass).toEqual(3);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should allow us to decrement the pass counter if the pass counter is visible', () => {
    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        hidePassOnStartup: false,
        initialPass: 3,
      },
    );

    expect(takeCounter.pass).toEqual(3);

    takeCounter.decrementPass();
    takeCounter.decrementPass();

    expect(takeCounter.pass).toEqual(1);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should allow us to increment the take counter', () => {
    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    expect(takeCounter.take).toEqual(1);

    takeCounter.incrementTake(); // Changes the state
    takeCounter.incrementTake(); // Increments the count

    expect(takeCounter.take).toEqual(2);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should allow us to decrement the take counter', () => {
    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        initialTake: 2,
      },
    );

    expect(takeCounter.take).toEqual(2);

    takeCounter.decrementTake(); // Changes the state
    takeCounter.decrementTake(); // Increments the count

    expect(takeCounter.take).toEqual(1);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should allow set the state message correctly', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 1,
      },
    );

    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.take).toEqual(1);
    takeCounter.incrementTake(); // Changes the state
    expect(selector.innerHTML).toEqual(StateMessage.CURRENT);
    takeCounter.incrementTake(); // Increments the count

    expect(takeCounter.take).toEqual(2);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);

    expect(takeCounter.history[takeCounter.pass]).toBe(takeCounter.take);
  });

  it('should not allow you to decrement the take below the minTakeCount', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 10,
        minTakeCount: 10,
      },
    );

    expect(takeCounter.take).toEqual(10);
    takeCounter.decrementTake();
    takeCounter.decrementTake();

    expect(takeCounter.take).toEqual(10);
  });

  it('should not allow you to increment the take above the maxTakeCount', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 10,
        maxTakeCount: 10,
      },
    );

    expect(takeCounter.take).toEqual(10);
    takeCounter.incrementTake();
    takeCounter.incrementTake();

    expect(takeCounter.take).toEqual(10);
  });

  it('should set the state to NEXT when decrementing from CURRENT and then just decrement the take', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 10,
      },
    );

    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.take).toEqual(10);
    takeCounter.incrementTake();
    expect(selector.innerHTML).toEqual(StateMessage.CURRENT);
    expect(takeCounter.take).toEqual(10);
    expect(takeCounter.history[takeCounter.pass]).toBe(10);

    takeCounter.decrementTake();

    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.take).toEqual(10);
    expect(takeCounter.history[takeCounter.pass]).toBe(10);

    takeCounter.decrementTake();
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.take).toEqual(9);
    expect(takeCounter.history[takeCounter.pass]).toBe(9);

    takeCounter.decrementTake();
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.take).toEqual(8);
    expect(takeCounter.history[takeCounter.pass]).toBe(8);
  });

  it('should reset the take when increment pass and the resetTakeOnNewPass option is set', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 1,
        resetTakeOnNewPass: true,
      },
    );

    expect(takeCounter.pass).toEqual(1);
    expect(takeCounter.take).toEqual(1);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementTake();
    expect(selector.innerHTML).toEqual(StateMessage.CURRENT);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementTake();
    expect(takeCounter.take).toEqual(2);
    expect(takeCounter.history[1]).toBe(2);

    takeCounter.incrementPass();

    expect(takeCounter.pass).toEqual(2);
    expect(takeCounter.take).toEqual(1);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[2]).toBe(1);
    expect(takeCounter.history[1]).toBe(2);
  });

  it('should increment the pass but not reset the take when resetTakeOnNewPass is false', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 1,
        resetTakeOnNewPass: false,
      },
    );

    expect(takeCounter.pass).toEqual(1);
    expect(takeCounter.take).toEqual(1);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementTake();
    expect(selector.innerHTML).toEqual(StateMessage.CURRENT);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementTake();
    expect(takeCounter.take).toEqual(2);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(2);

    takeCounter.initiateNewPass();

    expect(takeCounter.pass).toEqual(2);
    expect(takeCounter.take).toEqual(2);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(2);
    expect(takeCounter.history[2]).toBe(2);
  });

  it('should increment the pass and reset the take when resetTakeOnNewPass is true - initiateNewPass', () => {
    const stateElement = document.createElement('div');
    stateElement.classList.add('state-element');
    document.body.appendChild(stateElement);

    const selector = document.querySelector('.state-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        stateElement: selector,
      },
      {
        initialTake: 1,
        resetTakeOnNewPass: true,
      },
    );

    expect(takeCounter.pass).toEqual(1);
    expect(takeCounter.take).toEqual(1);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementTake();
    expect(selector.innerHTML).toEqual(StateMessage.CURRENT);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementTake();
    expect(takeCounter.take).toEqual(2);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(2);

    takeCounter.initiateNewPass();

    expect(takeCounter.pass).toEqual(2);
    expect(takeCounter.take).toEqual(1);
    expect(selector.innerHTML).toEqual(StateMessage.NEXT);
    expect(takeCounter.history[1]).toBe(2);
    expect(takeCounter.history[2]).toBe(1);
  });

  it('togglePass should correctly toggle the elements classes', () => {
    const takeContainer = document.createElement('div');
    takeContainer.classList.add('take-element');
    document.body.appendChild(takeContainer);

    const passContainer = document.createElement('div');
    passContainer.classList.add('pass-element');
    document.body.appendChild(passContainer);

    const passSelector = document.querySelector('.pass-element') as HTMLElement;
    const takeSelector = document.querySelector('.take-element') as HTMLElement;

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
        takeContainer: takeSelector,
        passContainer: passSelector,
      },
      {
        hidePassOnStartup: false,
      },
    );

    expect(takeContainer.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
    expect(takeContainer.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(passContainer.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
    expect(passContainer.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);

    takeCounter.togglePassVisible();

    expect(takeContainer.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
    expect(takeContainer.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(true);
    expect(passContainer.classList.contains(HIDDEN_CLASSNAME)).toBe(true);
    expect(passContainer.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);

    takeCounter.togglePassVisible();

    expect(takeContainer.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
    expect(takeContainer.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(passContainer.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
    expect(passContainer.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
  });

  it('selectTake should correctly set the take', () => {
    const promptSpy = jest
      .spyOn(global, 'prompt' as any)
      .mockReturnValueOnce(5);

    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    expect(takeCounter.take).toEqual(1);
    expect(takeCounter.pass).toEqual(1);

    expect(takeCounter.history[1]).toBe(1);

    takeCounter.selectTake();

    expect(takeCounter.take).toEqual(5);
    expect(takeCounter.pass).toEqual(1);

    expect(takeCounter.history[1]).toBe(5);
  });

  it('resetAndClear should ask the user to confirm and not take action if cancelled', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValueOnce(false);

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        hidePassOnStartup: false,
      },
    );

    expect(takeCounter.take).toEqual(1);
    expect(takeCounter.pass).toEqual(1);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementPass();
    expect(takeCounter.history[2]).toBe(1);
    takeCounter.incrementPass();
    expect(takeCounter.history[3]).toBe(1);
    takeCounter.incrementTake();
    takeCounter.incrementTake();
    expect(takeCounter.history[3]).toBe(2);
    takeCounter.incrementTake();
    takeCounter.incrementTake();

    expect(takeCounter.take).toEqual(3);
    expect(takeCounter.pass).toEqual(3);
    expect(takeCounter.history[3]).toBe(3);

    takeCounter.resetAndClear();

    expect(confirmSpy).toHaveBeenCalled();

    expect(takeCounter.take).toEqual(3);
    expect(takeCounter.pass).toEqual(3);

    expect(takeCounter.history[3]).toBe(3);
  });

  it('resetAndClear should ask the user to confirm and reset take and pass if confirmed', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValueOnce(true);

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        hidePassOnStartup: false,
      },
    );

    expect(takeCounter.take).toEqual(1);
    expect(takeCounter.pass).toEqual(1);
    expect(takeCounter.history[1]).toBe(1);

    takeCounter.incrementPass();
    expect(takeCounter.history[2]).toBe(1);
    takeCounter.incrementPass();
    expect(takeCounter.history[3]).toBe(1);
    takeCounter.incrementTake();
    takeCounter.incrementTake();
    expect(takeCounter.history[3]).toBe(2);
    takeCounter.incrementTake();
    takeCounter.incrementTake();

    expect(takeCounter.take).toEqual(3);
    expect(takeCounter.pass).toEqual(3);
    expect(takeCounter.history[3]).toBe(3);

    takeCounter.resetAndClear();

    expect(confirmSpy).toHaveBeenCalled();

    expect(takeCounter.take).toEqual(1);
    expect(takeCounter.pass).toEqual(1);
    expect(takeCounter.history[1]).toBe(1);
  });

  it('should correctly call the function registred to the control key', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValueOnce(true);

    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    // NumpadDecimal - default for reset and clear
    var event = new KeyboardEvent('keydown', { code: 'NumpadDecimal' });
    window.dispatchEvent(event);

    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should not call any function if the control key is not registerd', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValueOnce(true);

    const takeCounter = new TakeCounter({
      ...getDefaultElements(),
    });

    // NumpadDecimal - default for reset and clear
    var event = new KeyboardEvent('keydown', { code: 'Numpad1' });
    window.dispatchEvent(event);

    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('should load the previous passes take count when the pass disablePassHistoryLoad is false', () => {
    const promptSpy = jest
      .spyOn(global, 'prompt' as any)
      .mockReturnValueOnce(5);

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        disablePassHistoryLoad: false,
        resetTakeOnNewPass: true,
      },
    );

    takeCounter.selectTake();
    expect(takeCounter.history[1]).toBe(5);

    takeCounter.incrementPass();
    takeCounter.incrementTake();
    takeCounter.incrementTake();
    expect(takeCounter.history[1]).toBe(5);
    expect(takeCounter.history[2]).toBe(2);

    takeCounter.decrementPass();
    expect(takeCounter.history[1]).toBe(5);
    expect(takeCounter.history[2]).toBe(2);

    expect(takeCounter.pass).toBe(1);
    expect(takeCounter.take).toBe(5);
  });

  it('should not load the previous passes take count when the pass disablePassHistoryLoad is true', () => {
    const promptSpy = jest
      .spyOn(global, 'prompt' as any)
      .mockReturnValueOnce(5);

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        resetTakeOnNewPass: true,
        disablePassHistoryLoad: true,
      },
    );

    takeCounter.selectTake();
    expect(takeCounter.history[1]).toBe(5);

    takeCounter.incrementPass();
    takeCounter.incrementTake();
    takeCounter.incrementTake();
    expect(takeCounter.history[1]).toBe(5);
    expect(takeCounter.history[2]).toBe(2);

    takeCounter.decrementPass();
    expect(takeCounter.history[1]).toBe(2);
    expect(takeCounter.history[2]).toBe(2);

    expect(takeCounter.pass).toBe(1);
    expect(takeCounter.take).toBe(2);
  });

  it('should not load the previous passes take count and next take count when the pass disablePassHistoryLoad is false', () => {
    const promptSpy = jest
      .spyOn(global, 'prompt' as any)
      .mockReturnValueOnce(5);

    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        resetTakeOnNewPass: false,
        disablePassHistoryLoad: false,
      },
    );

    takeCounter.selectTake();
    expect(takeCounter.history[1]).toBe(5);

    takeCounter.incrementPass();
    takeCounter.incrementTake();
    takeCounter.incrementTake();
    expect(takeCounter.history[1]).toBe(5);
    expect(takeCounter.history[2]).toBe(6);

    takeCounter.decrementPass();
    expect(takeCounter.history[1]).toBe(5);
    expect(takeCounter.history[2]).toBe(6);

    expect(takeCounter.pass).toBe(1);
    expect(takeCounter.take).toBe(5);

    takeCounter.incrementPass();
    expect(takeCounter.history[1]).toBe(5);
    expect(takeCounter.history[2]).toBe(6);

    expect(takeCounter.pass).toBe(2);
    expect(takeCounter.take).toBe(6);
  });

  it('should set the pass and take correctly and store in history if it tries to load a non existant pass', () => {
    const takeCounter = new TakeCounter(
      {
        ...getDefaultElements(),
      },
      {
        initialPass: 10,
        resetTakeOnNewPass: false,
        disablePassHistoryLoad: false,
      },
    );

    takeCounter.decrementPass();
    expect(takeCounter.pass).toBe(9);
    expect(takeCounter.take).toBe(1);
    expect(takeCounter.history[9]).toBe(1);
  });
});
