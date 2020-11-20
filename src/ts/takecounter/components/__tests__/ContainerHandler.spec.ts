import { FULL_WIDTH_CLASSNAME, HIDDEN_CLASSNAME } from '../../../constants';
import { ContainerHandler, ContainerStatus } from '../ContainerHandler';

describe('ContainerHandler', () => {
  it('should not hide or set our element to full width by default', () => {
    const newElement = document.createElement('div');
    const defaultElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement);

    expect(newElement).toEqual(defaultElement);
    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should automatically append the hidden class name when the hideOnStart option is true', () => {
    const newElement = document.createElement('div');
    const defaultElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, true);

    expect(newElement).not.toEqual(defaultElement);
    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);
  });

  it('should not allow you to set the element to be prominent by default if hideOnStart is true', () => {
    const newElement = document.createElement('div');
    const defaultElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, true, true);

    expect(newElement).not.toEqual(defaultElement);
    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);
  });

  it('should automatically append the full width class name when the isDefaultFullWidth option is true', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, false, true);

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should automatically append the custom hidden class name when one is passed and the element is hidden', () => {
    const newElement = document.createElement('div');
    const testClassName = 'test-class-hidden';
    const containerHandler = new ContainerHandler(
      newElement,
      true,
      false,
      testClassName,
    );

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(testClassName)).toBe(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should automatically append the custom full width class name when one is passed and the element is visible', () => {
    const newElement = document.createElement('div');
    const testFullClassName = 'test-class-full';
    const containerHandler = new ContainerHandler(
      newElement,
      false,
      true,
      'testClassName',
      testFullClassName,
    );

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(testFullClassName)).toBe(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should not automatically append the custom full width class name when one is passed and the element is hidden', () => {
    const newElement = document.createElement('div');
    const testFullClassName = 'test-class-full';
    const containerHandler = new ContainerHandler(
      newElement,
      true,
      true,
      'testClassName',
      testFullClassName,
    );

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(testFullClassName)).toBe(false);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should toggle the status correctly', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement);

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);

    containerHandler.toggle();

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);

    containerHandler.toggle();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should allow you to set the hide status correctly', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement);

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);

    containerHandler.hide();

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);

    // Try again - nothing should change
    containerHandler.hide();

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);
  });

  it('should allow you to set the show status correctly', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, true);

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);

    containerHandler.show();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);

    // Try again - nothing should change
    containerHandler.show();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);
  });

  it('should not allow you to set the prominent status if the element is hidden', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, true);

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);

    containerHandler.setIsProminent();

    expect(containerHandler.isVisible).toEqual(false);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
  });

  it('should allow you to set the prominent status if the element is visible', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, false);

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);

    containerHandler.setIsProminent();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(true);

    // Try again - should not toggle
    containerHandler.setIsProminent();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(true);
  });

  it('should allow you to remove the prominent status if the element is prominent', () => {
    const newElement = document.createElement('div');
    const containerHandler = new ContainerHandler(newElement, false);

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(HIDDEN_CLASSNAME)).toBe(false);

    containerHandler.setIsProminent();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(true);

    containerHandler.removeIsProminent();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);

    // Try again - should not toggle
    containerHandler.removeIsProminent();

    expect(containerHandler.isVisible).toEqual(true);
    expect(newElement.classList.contains(FULL_WIDTH_CLASSNAME)).toBe(false);
  });
});
