import ElementHandler from './ElementHandler';

export default class Counter {
  private _elementHandler: ElementHandler;
  private _count: number;

  constructor(count: number, element: HTMLElement) {
    this._elementHandler = new ElementHandler(element);
    this._count = count || 0;
    this.updateElement();
  }

  // Make read only
  get count() {
    return this._count;
  }

  updateElement() {
    this._elementHandler.set(this._count);
  }

  incrementCount(): number {
    this._count += 1;
    this.updateElement();

    return this._count;
  }

  decrementCount(): number {
    this._count > 1 ? (this._count -= 1) : 1;
    this.updateElement();

    return this._count;
  }

  set(value: number): number {
    if (value) {
      this._count = Math.round(value);
      this.updateElement();
    }

    return this._count;
  }

  reset(): number {
    this._count = 1;
    this.updateElement();

    return this._count;
  }
}
