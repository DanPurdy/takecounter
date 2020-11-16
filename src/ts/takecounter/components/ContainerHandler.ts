const HIDDEN_CLASS = 'hidden';

export enum ContainerStatus {
  HIDDEN,
  VISIBLE,
}

export default class ContainerHandler {
  container: HTMLElement;
  status: ContainerStatus;

  constructor(container: HTMLElement) {
    this.container = container;
    this.status = ContainerStatus.VISIBLE;
  }

  hide() {
    if (!this.container.classList.contains(HIDDEN_CLASS)) {
      this.container.classList.add(HIDDEN_CLASS);
      this.status = ContainerStatus.HIDDEN;
    }
  }

  show() {
    if (this.container.classList.contains(HIDDEN_CLASS)) {
      this.container.classList.remove(HIDDEN_CLASS);
      this.status = ContainerStatus.VISIBLE;
    }
  }
}
