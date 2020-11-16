export enum StateMessage {
  CURRENT = 'Current',
  NEXT = 'Next',
}

export default class MessageHandler {
  element: HTMLElement;

  constructor(stateMessage: StateMessage, stateMessageElement: HTMLElement) {
    this.element = stateMessageElement;
    this.stateMessage = stateMessage || StateMessage.NEXT;
  }

  set stateMessage(message: StateMessage) {
    this.element.innerHTML = message;
  }

  setNextMessage() {
    this.stateMessage = StateMessage.NEXT;
  }

  setCurrentMessage() {
    this.stateMessage = StateMessage.CURRENT;
  }
}
