import { FULL_WIDTH_CLASSNAME, HIDDEN_CLASSNAME } from '../const';

export enum ContainerStatus {
  HIDDEN,
  VISIBLE,
}

export default class ContainerHandler {
  private _container: HTMLElement;
  private _containerHiddenClassName: string;
  private _containerFullWidthClassName: string;
  private _status: ContainerStatus;

  constructor(
    container: HTMLElement,
    hideOnStart: boolean = false,
    isDefaultFullWidth: boolean = false,
    hiddenClassName: string = HIDDEN_CLASSNAME,
    fullWidthClassName: string = FULL_WIDTH_CLASSNAME,
  ) {
    this._container = container;
    this._containerHiddenClassName = hiddenClassName;
    this._containerFullWidthClassName = fullWidthClassName;
    this._status = hideOnStart
      ? ContainerStatus.HIDDEN
      : ContainerStatus.VISIBLE;

    if (this._status === ContainerStatus.HIDDEN) {
      this.hide();
    }

    if (isDefaultFullWidth) {
      this.setIsProminent();
    }
  }

  get isVisible() {
    return this._status === ContainerStatus.VISIBLE;
  }

  toggle() {
    this._status === ContainerStatus.VISIBLE ? this.hide() : this.show();
  }

  hide() {
    if (!this._container.classList.contains(this._containerHiddenClassName)) {
      this._container.classList.add(this._containerHiddenClassName);
      this._status = ContainerStatus.HIDDEN;
    }
  }

  setIsProminent() {
    if (
      !this._container.classList.contains(this._containerFullWidthClassName)
    ) {
      this._container.classList.add(this._containerFullWidthClassName);
    }
  }

  removeIsProminent() {
    if (this._container.classList.contains(this._containerFullWidthClassName)) {
      this._container.classList.remove(this._containerFullWidthClassName);
    }
  }

  show() {
    if (this._container.classList.contains(this._containerHiddenClassName)) {
      this._container.classList.remove(this._containerHiddenClassName);
      this._status = ContainerStatus.VISIBLE;
    }
  }
}
