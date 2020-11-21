import { Selector, t } from 'testcafe';

export default class TakecounterPage {
  passContainer: Selector;
  passElement: Selector;
  takeContainer: Selector;
  takeElement: Selector;
  stateMessageElement: Selector;

  constructor() {
    this.passContainer = Selector('[data-e2e="pass-container"]');
    this.passElement = Selector('[data-e2e="pass-element"]');
    this.takeContainer = Selector('[data-e2e="take-container"]');
    this.takeElement = Selector('[data-e2e="take-element"]');
    this.stateMessageElement = Selector('[data-e2e="state-message"]');
  }
}
