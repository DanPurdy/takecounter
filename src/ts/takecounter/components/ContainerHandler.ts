const HIDDEN_CLASS = 'hidden';

export enum ContainerStatus {
  HIDDEN,
  VISIBLE,
}

export default class ContainerHandler {
  private _container: HTMLElement;
  private _status: ContainerStatus;

  constructor(container: HTMLElement, hideOnStart: boolean = false) {
    this._container = container;
    this._status = hideOnStart
      ? ContainerStatus.HIDDEN
      : ContainerStatus.VISIBLE;

    if (this._status === ContainerStatus.HIDDEN) {
      this.hide();
    }
  }

  get isVisible() {
    return this._status === ContainerStatus.VISIBLE;
  }

  toggle() {
    this._status === ContainerStatus.VISIBLE ? this.hide() : this.show();
  }

  hide() {
    if (!this._container.classList.contains(HIDDEN_CLASS)) {
      this._container.classList.add(HIDDEN_CLASS);
      this._status = ContainerStatus.HIDDEN;
    }
  }

  show() {
    if (this._container.classList.contains(HIDDEN_CLASS)) {
      this._container.classList.remove(HIDDEN_CLASS);
      this._status = ContainerStatus.VISIBLE;
    }
  }
}
