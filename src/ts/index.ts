import TakeCounter from './takecounter/TakeCounter';

const app = new TakeCounter({
  passContainer: document.querySelector('.js-pass-container'),
  passElement: document.querySelector('.js-pass-elem'),
  takeContainer: document.querySelector('.js-take-container'),
  takeElement: document.querySelector('.js-take-elem'),
  stateElement: document.querySelector('.js-state-message'),
});
