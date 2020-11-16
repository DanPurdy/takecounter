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
