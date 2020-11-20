import { ElementHandler } from '../ElementHandler';

describe('ElementHandler', () => {
  it('should have set the correct element', () => {
    const newElement = document.createElement('div');
    const elementHandler = new ElementHandler(newElement);

    expect(elementHandler.element).toEqual(newElement);
  });

  it('It should correctly set the value of a DOM element - number', () => {
    const newElement = document.createElement('div');
    const elementHandler = new ElementHandler(newElement);

    elementHandler.set(5);

    expect(newElement.innerHTML).toBe('5');
  });

  it('It should correctly set the value of a DOM element - string', () => {
    const newElement = document.createElement('div');
    const elementHandler = new ElementHandler(newElement);
    const DEFAULT_TEXT = 'myText';

    elementHandler.set(DEFAULT_TEXT);

    expect(newElement.innerHTML).toBe(DEFAULT_TEXT);
  });
});
