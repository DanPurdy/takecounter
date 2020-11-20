import { ACTIVE_MESSAGE_SECTION_CLASS } from '../../../constants';
import { MessageHandler, StateMessage } from '../MessageHandler';

describe('MessageHandler', () => {
  it('should have set the correct default state on instantiation', () => {
    const newElement = document.createElement('div');
    const messageHandler = new MessageHandler(newElement);

    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      false,
    );
    expect(newElement.innerHTML).toEqual(StateMessage.NEXT);
    expect(messageHandler.current).toEqual(StateMessage.NEXT);
  });

  it('should have set the correct state on instantiation when passed on instantiation', () => {
    const newElement = document.createElement('div');
    const messageHandler = new MessageHandler(newElement, StateMessage.CURRENT);

    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      true,
    );
    expect(newElement.innerHTML).toEqual(StateMessage.CURRENT);
    expect(messageHandler.current).toEqual(StateMessage.CURRENT);
  });

  it('should correctly add the custom active class for active state message (current)', () => {
    const customClassName = 'custom-class--active';
    const newElement = document.createElement('div');
    const messageHandler = new MessageHandler(
      newElement,
      StateMessage.CURRENT,
      customClassName,
    );

    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      false,
    );
    expect(newElement.classList.contains(customClassName)).toBe(true);
    expect(newElement.innerHTML).toEqual(StateMessage.CURRENT);
    expect(messageHandler.current).toEqual(StateMessage.CURRENT);
  });

  it('should correctly not add the custom active class for non active state message (next)', () => {
    const customClassName = 'custom-class--active';
    const newElement = document.createElement('div');
    const messageHandler = new MessageHandler(
      newElement,
      StateMessage.NEXT,
      customClassName,
    );

    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      false,
    );
    expect(newElement.classList.contains(customClassName)).toBe(false);
    expect(newElement.innerHTML).toEqual(StateMessage.NEXT);
    expect(messageHandler.current).toEqual(StateMessage.NEXT);
  });

  it('should allow you to set the correct next state', () => {
    const newElement = document.createElement('div');
    const messageHandler = new MessageHandler(newElement, StateMessage.CURRENT);

    expect(messageHandler.current).toEqual(StateMessage.CURRENT);
    expect(newElement.innerHTML).toEqual(StateMessage.CURRENT);
    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      true,
    );

    messageHandler.setNextMessage();

    expect(messageHandler.current).toEqual(StateMessage.NEXT);
    expect(newElement.innerHTML).toEqual(StateMessage.NEXT);
    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      false,
    );
  });

  it('should allow you to set the correct current state', () => {
    const newElement = document.createElement('div');
    const messageHandler = new MessageHandler(newElement, StateMessage.NEXT);

    expect(messageHandler.current).toEqual(StateMessage.NEXT);
    expect(newElement.innerHTML).toEqual(StateMessage.NEXT);
    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      false,
    );

    messageHandler.setCurrentMessage();

    expect(messageHandler.current).toEqual(StateMessage.CURRENT);
    expect(newElement.innerHTML).toEqual(StateMessage.CURRENT);
    expect(newElement.classList.contains(ACTIVE_MESSAGE_SECTION_CLASS)).toBe(
      true,
    );
  });
});
