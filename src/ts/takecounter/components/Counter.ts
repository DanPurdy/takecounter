import ElementHandler from './ElementHandler';

export default class Counter {
  private _elementHandler: ElementHandler;
  private _count: number;
  private _initialCount: number;
  private _maxCount: number;
  private _minCount: number;

  constructor(
    element: HTMLElement,
    count: number = 1,
    maxCount: number = 999,
    minCount: number = 1,
  ) {
    this._elementHandler = new ElementHandler(element);
    this._maxCount = maxCount;
    this._minCount = minCount;
    this._initialCount = this.set(count);
  }

  // Make read only
  get count() {
    return this._count;
  }

  updateElement() {
    this._elementHandler.set(this._count);
  }

  incrementCount(): number {
    this.set(this._count + 1);

    return this._count;
  }

  decrementCount(): number {
    this.set(this._count - 1);

    return this._count;
  }

  set(value: number): number {
    if (value) {
      this._count = Math.min(
        Math.max(Math.round(value), this._minCount),
        this._maxCount,
      );
      this.updateElement();
    }

    return this._count;
  }

  reset(): number {
    return this.set(this._initialCount);
  }
}
