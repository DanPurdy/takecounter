import { ACTIVE_MESSAGE_SECTION_CLASS } from '../../constants';

export enum StateMessage {
  CURRENT = 'Current',
  NEXT = 'Next',
}

export class MessageHandler {
  private _activeClassName: string;
  private _element: HTMLElement;
  private _message: StateMessage;

  constructor(
    stateMessageElement: HTMLElement,
    stateMessage: StateMessage = StateMessage.NEXT,
    activeClassName: string = ACTIVE_MESSAGE_SECTION_CLASS,
  ) {
    this._activeClassName = activeClassName;
    this._element = stateMessageElement;
    this.stateMessage = stateMessage;
  }

  set stateMessage(message: StateMessage) {
    this._message = message;
    this._element.innerHTML = message;

    if (
      message === StateMessage.CURRENT &&
      !this._element.classList.contains(this._activeClassName)
    ) {
      this._element.classList.add(this._activeClassName);
    } else if (
      message === StateMessage.NEXT &&
      this._element.classList.contains(this._activeClassName)
    ) {
      this._element.classList.remove(this._activeClassName);
    }
  }

  get current() {
    return this._message;
  }

  setNextMessage() {
    this.stateMessage = StateMessage.NEXT;
  }

  setCurrentMessage() {
    this.stateMessage = StateMessage.CURRENT;
  }
}
