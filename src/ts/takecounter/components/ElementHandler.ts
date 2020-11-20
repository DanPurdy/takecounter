export class ElementHandler {
  readonly element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  set(value: number | string) {
    this.element.innerHTML = `${value}`;
  }
}
