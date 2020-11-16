export default class Counter {
  count: number;
  counterContainer: HTMLElement;
  counterElement: HTMLElement;

  constructor(count: number) {
    this.count = count || 0;
  }

  incrementCount(): number {
    this.count += 1;

    return this.count;
  }

  decrementCount(): number {
    this.count > 1 ? (this.count -= 1) : 1;

    return this.count;
  }

  reset(): number {
    this.count = 1;

    return this.count;
  }
}
