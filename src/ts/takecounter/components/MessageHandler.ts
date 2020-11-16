const ACTIVE_MESSAGE_SECTION_CLASS = 'state-section--active';

export enum StateMessage {
  CURRENT = 'Current',
  NEXT = 'Next',
}

export default class MessageHandler {
  private _element: HTMLElement;
  private message: StateMessage;

  constructor(stateMessage: StateMessage, stateMessageElement: HTMLElement) {
    this._element = stateMessageElement;
    this.stateMessage = stateMessage || StateMessage.NEXT;
  }

  set stateMessage(message: StateMessage) {
    this.message = message;
    this._element.innerHTML = message;

    if (
      message === StateMessage.CURRENT &&
      !this._element.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)
    ) {
      this._element.classList.add(ACTIVE_MESSAGE_SECTION_CLASS);
    } else if (
      message === StateMessage.NEXT &&
      this._element.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)
    ) {
      this._element.classList.remove(ACTIVE_MESSAGE_SECTION_CLASS);
    }
  }

  get current() {
    return this.message;
  }

  setNextMessage() {
    this.stateMessage = StateMessage.NEXT;
  }

  setCurrentMessage() {
    this.stateMessage = StateMessage.CURRENT;
  }
}
