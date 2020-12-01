import { LOCALSTORAGE_HISTORY_KEY } from '../../constants';

export const DEFAULT_STATE = { '1': 1 };

export class HistoryManager {
  private _history: TakeCounterHistoryState;

  constructor(initialState: TakeCounterHistoryState = {}) {
    this._history = this._getInitialState(initialState);
  }

  private get hasSavedHistory(): boolean {
    return (
      !!this._loadFromStorage() && !!Object.keys(this._loadFromStorage()).length
    );
  }

  private _getInitialState(
    initialState: TakeCounterHistoryState,
  ): TakeCounterHistoryState {
    if (initialState && Object.keys(initialState).length) {
      return { ...initialState };
    }

    return { ...DEFAULT_STATE };
  }

  private _loadFromStorage() {
    return JSON.parse(window.localStorage.getItem(LOCALSTORAGE_HISTORY_KEY));
  }

  private _saveToStorage() {
    window.localStorage.setItem(
      LOCALSTORAGE_HISTORY_KEY,
      JSON.stringify(this._history),
    );
  }

  private _restore(recalledState: TakeCounterHistoryState) {
    this._history = { ...recalledState };
  }

  // Make read only - prevents writes from outside module but allows internal
  get state(): TakeCounterHistoryState {
    return this._history;
  }

  get latestPassAndTake(): { pass: number; take: number } {
    const latestPass: number = Math.max.apply(null, Object.keys(this._history));

    return { pass: latestPass, take: this._history[`${latestPass}`] };
  }

  checkAndLoadHistoricalData() {
    if (
      this.hasSavedHistory &&
      confirm('Woud you like to load your last session?')
    ) {
      this._restore(this._loadFromStorage());
      return true;
    } else {
      window.localStorage.clear();
      return false;
    }
  }

  set(key: number, value: number): void {
    this._history[key] = value;

    this._saveToStorage();
  }

  load(key: number): number {
    if (this._history.hasOwnProperty(key)) {
      return this._history[key];
    }

    throw new Error(`Pass ${key} does not exist`);
  }

  reset(state: TakeCounterHistoryState = DEFAULT_STATE): void {
    this._history = { ...state };

    this._saveToStorage();
  }
}
