import { HistoryManager } from '../HistoryManager';

const DEFAULT_STATE = { 1: 10, 2: 20 };

describe('History Manager', () => {
  it('Should set the inital state correctly', () => {
    const history = new HistoryManager(DEFAULT_STATE);

    expect(history.state).toEqual(DEFAULT_STATE);
  });

  it('Should allow you to set a take for a pass value', () => {
    const VALUE = 40;
    const history = new HistoryManager();

    expect(history.state).toEqual({});

    history.set(4, VALUE);

    expect(history.load(4)).toBe(VALUE);
  });

  it('Should allow you to overwrite a take for an existing pass value', () => {
    const VALUE = 40;
    const history = new HistoryManager(DEFAULT_STATE);

    expect(history.state).toEqual(DEFAULT_STATE);

    history.set(1, VALUE);
    history.set(2, VALUE + 2);

    expect(history.load(1)).toBe(VALUE);
    expect(history.load(2)).toBe(VALUE + 2);
  });

  it('Should allow you to reset the state to empty', () => {
    const history = new HistoryManager(DEFAULT_STATE);

    expect(history.state).toEqual(DEFAULT_STATE);

    history.reset();

    expect(history.state).toEqual({});
  });

  it("Should throw an error when trying to access a pass that doesn't exist", () => {
    const history = new HistoryManager();
    expect(history.state).toEqual({});
    try {
      history.load(4);
    } catch (err) {
      expect(err.message).toBe('Pass 4 does not exist');
    }
  });
});
