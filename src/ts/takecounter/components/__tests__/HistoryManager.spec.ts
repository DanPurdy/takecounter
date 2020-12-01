import { LOCALSTORAGE_HISTORY_KEY } from '../../../constants';
import { HistoryManager } from '../HistoryManager';

const DEFAULT_TEST_STATE = { 1: 10, 2: 20 };

describe('History Manager', () => {
  afterEach(() => {
    window.localStorage.clear();
    jest.restoreAllMocks();
  });

  it('Should set the inital state correctly', () => {
    const history = new HistoryManager(DEFAULT_TEST_STATE);

    expect(history.state).toEqual(DEFAULT_TEST_STATE);
  });

  it('Should allow you to set a take for a pass value', () => {
    const VALUE = 40;
    const history = new HistoryManager();

    expect(history.state).toEqual({ '1': 1 });

    history.set(4, VALUE);

    expect(history.load(4)).toBe(VALUE);
  });

  it('Should allow you to overwrite a take for an existing pass value', () => {
    const VALUE = 40;
    const history = new HistoryManager(DEFAULT_TEST_STATE);

    expect(history.state).toEqual(DEFAULT_TEST_STATE);

    history.set(1, VALUE);
    history.set(2, VALUE + 2);

    expect(history.load(1)).toBe(VALUE);
    expect(history.load(2)).toBe(VALUE + 2);
  });

  it('Should allow you to reset the state to empty', () => {
    const history = new HistoryManager(DEFAULT_TEST_STATE);

    expect(history.state).toEqual(DEFAULT_TEST_STATE);

    history.reset();

    expect(history.state).toEqual({ '1': 1 });
  });

  it("Should throw an error when trying to access a pass that doesn't exist", () => {
    const history = new HistoryManager();
    expect(history.state).toEqual({ '1': 1 });
    try {
      history.load(4);
    } catch (err) {
      expect(err.message).toBe('Pass 4 does not exist');
    }
  });

  it('checkAndLoadHistoricalData should return false if there is no previous saved state', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValueOnce(false);

    const history = new HistoryManager();

    expect(history.checkAndLoadHistoricalData()).toBe(false);
    expect(confirmSpy).not.toHaveBeenCalled();
  });

  it('checkAndLoadHistoricalData should return false and clear history from localstorage if there is previous saved state but the user chooses to load it', () => {
    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValueOnce(false);

    window.localStorage.setItem(
      LOCALSTORAGE_HISTORY_KEY,
      JSON.stringify(DEFAULT_TEST_STATE),
    );
    const history = new HistoryManager();

    expect(history.checkAndLoadHistoricalData()).toBe(false);
    expect(window.localStorage.getItem(LOCALSTORAGE_HISTORY_KEY)).toBe(null);
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('checkAndLoadHistoricalData should return true if there is previous saved state and the user chooses to load it', () => {
    window.localStorage.setItem(
      LOCALSTORAGE_HISTORY_KEY,
      JSON.stringify(DEFAULT_TEST_STATE),
    );

    const confirmSpy = jest
      .spyOn(global, 'confirm' as any)
      .mockReturnValue(true);
    const history = new HistoryManager();

    const output = history.checkAndLoadHistoricalData();

    expect(confirmSpy).toHaveBeenCalled();
    expect(output).toBe(true);

    expect(history.state).toEqual(DEFAULT_TEST_STATE);
  });

  it('should return the largest numbered key when accessing latestPassAndTake', () => {
    const history = new HistoryManager(DEFAULT_TEST_STATE);

    expect(history.latestPassAndTake).toEqual({ pass: 2, take: 20 });
  });

  it('should return the largest numbered key when accessing latestPassAndTake with no default state', () => {
    const history = new HistoryManager();

    expect(history.latestPassAndTake).toEqual({ pass: 1, take: 1 });
  });

  it('should return the largest numbered key when accessing latestPassAndTake with no default state', () => {
    const history = new HistoryManager();

    expect(history.latestPassAndTake).toEqual({ pass: 1, take: 1 });
  });
});
