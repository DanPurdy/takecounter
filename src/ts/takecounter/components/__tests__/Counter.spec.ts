import { Counter } from '../Counter';

describe('Counter', () => {
  it('Should set the default count correctly', () => {
    const newElement = document.createElement('div');
    const counter = new Counter(newElement);

    expect(newElement.innerHTML).toEqual('1');
    expect(counter.count).toEqual(1);
  });

  it('Should set the default count correctly when a valid default is passed', () => {
    const defaultCount = 20;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount);

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);
  });

  it('Should set the default count correctly to 1 when an invalid low default is passed', () => {
    const defaultCount = -20;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount);

    expect(newElement.innerHTML).toEqual('1');
    expect(counter.count).toEqual(1);
  });

  it('Should set the default count correctly to our custom minimum when an invalid low default is passed', () => {
    const defaultCount = -20;
    const minCount = 40;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount, 999, minCount);

    expect(newElement.innerHTML).toEqual(`${minCount}`);
    expect(counter.count).toEqual(minCount);
  });

  it('Should set the default count correctly to the default max count 999 when an invalid high default is passed', () => {
    const defaultCount = 20000;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount);

    expect(newElement.innerHTML).toEqual('999');
    expect(counter.count).toEqual(999);
  });

  it('Should set the default count correctly to the custom max count when an invalid high default is passed', () => {
    const defaultCount = 20000;
    const maxCount = 100;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount, maxCount);

    expect(newElement.innerHTML).toEqual('100');
    expect(counter.count).toEqual(100);
  });

  it('should not allow minCount to be less than 0', () => {
    const invalidMinCount = -1;
    const invalidDefaultCount = -10;
    const newElement = document.createElement('div');
    const counter = new Counter(
      newElement,
      invalidDefaultCount,
      999,
      invalidMinCount,
    );

    expect(newElement.innerHTML).toEqual('0');
    expect(counter.count).toEqual(0);
  });

  it('should force maxCount to be minCount + 1 if the provided maxCount is less than minCount', () => {
    const invalidMinCount = 10;
    const invalidMaxCount = 9;
    const invalidDefaultCount = 15;
    const newElement = document.createElement('div');
    const counter = new Counter(
      newElement,
      invalidDefaultCount,
      invalidMaxCount,
      invalidMinCount,
    );

    expect(newElement.innerHTML).toEqual(`${invalidMinCount + 1}`);
    expect(counter.count).toEqual(invalidMinCount + 1);
  });

  it('Should correctly increment the count', () => {
    const newElement = document.createElement('div');
    const counter = new Counter(newElement);

    expect(newElement.innerHTML).toEqual('1');
    expect(counter.count).toEqual(1);

    expect(counter.incrementCount()).toEqual(2);
    expect(counter.count).toEqual(2);
    expect(newElement.innerHTML).toEqual('2');
  });

  it('Should correctly decrement the count', () => {
    const defaultCount = 10;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount);

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);

    expect(counter.decrementCount()).toEqual(defaultCount - 1);
    expect(counter.count).toEqual(defaultCount - 1);
    expect(newElement.innerHTML).toEqual(`${defaultCount - 1}`);
  });

  it('should correctly set a valid value passed into the set method', () => {
    const newElement = document.createElement('div');
    const counter = new Counter(newElement);
    const newCount = 10;

    expect(newElement.innerHTML).toEqual('1');
    expect(counter.count).toEqual(1);

    expect(counter.set(newCount)).toEqual(newCount);
    expect(newElement.innerHTML).toEqual(`${newCount}`);
    expect(counter.count).toEqual(newCount);
  });

  it('should correctly set a value to maximum when a value larger than the maximum is passed to set', () => {
    const defaultCount = 1;
    const maxCount = 9;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount, maxCount);
    const newCount = 10;

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);

    expect(counter.set(newCount)).toEqual(maxCount);
    expect(newElement.innerHTML).toEqual(`${maxCount}`);
    expect(counter.count).toEqual(maxCount);
  });

  it('should correctly set a value to minimum when a value smaller than the minimum is passed to set', () => {
    const defaultCount = 15;
    const maxCount = 999;
    const minCount = 9;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount, maxCount, minCount);
    const newCount = 1;

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);

    expect(counter.set(newCount)).toEqual(minCount);
    expect(newElement.innerHTML).toEqual(`${minCount}`);
    expect(counter.count).toEqual(minCount);
  });

  it('should not try to set a value if undefined is passed to set', () => {
    const defaultCount = 10;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount);

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);

    counter.set(undefined);

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);
  });

  it('should correctly reset the counter to initial count with reset method', () => {
    const defaultCount = 10;
    const newCount = 14;
    const newElement = document.createElement('div');
    const counter = new Counter(newElement, defaultCount);

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);

    for (let i = defaultCount; i < newCount; i++) {
      counter.incrementCount();
    }

    expect(newElement.innerHTML).toEqual(`${newCount}`);
    expect(counter.count).toEqual(newCount);

    expect(counter.reset()).toEqual(defaultCount);

    expect(newElement.innerHTML).toEqual(`${defaultCount}`);
    expect(counter.count).toEqual(defaultCount);
  });
});
