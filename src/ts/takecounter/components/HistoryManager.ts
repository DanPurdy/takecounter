export class HistoryManager {
  private _history: { [key: number]: number };

  constructor(initialState: { [key: number]: number } = {}) {
    this._history = { ...initialState };
  }

  // Make read only - prevents writes from outside module but allows internal
  get state() {
    return this._history;
  }

  set(key: number, value: number): void {
    this._history[key] = value;
  }

  load(key: number): number {
    if (this._history.hasOwnProperty(key)) {
      return this._history[key];
    }

    throw new Error(`Pass ${key} does not exist`);
  }

  reset(): void {
    this._history = {};
  }
}
