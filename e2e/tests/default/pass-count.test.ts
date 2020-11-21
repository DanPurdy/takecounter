import { DEFAULT_OPTIONS_CONTROLS } from '../../../src/ts/constants';
import { StateMessage } from '../../../src/ts/takecounter/components/MessageHandler';
import { E2E_HOST } from '../../config/config';
import TakecounterPage from '../../page-objects/selectors';
import { customPressKey } from '../../utils/custom-press-key';

const tkPage = new TakecounterPage();

const passCountsFixture = fixture`Pass count section`
  .page`${E2E_HOST}`.beforeEach(async (t) => {
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.togglePassVisible);
  await t
    .expect(tkPage.passContainer.visible)
    .ok('Pass container needs to be visible for each test to pass');

  // Get the take counter to 2 and state current so we can ensure the pass counter does not effect it
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
});

test('should exist and be visible', async (t) => {
  await t
    .expect(tkPage.passContainer.exists)
    .ok('Pass container should exist')
    .expect(tkPage.passElement.exists)
    .ok('Pass element should exist')
    .expect(tkPage.passContainer.visible)
    .ok('Pass container should be visible')
    .expect(tkPage.passElement.visible)
    .ok('Pass element should be visible');
});

test('should allow you to increment and decrement the count', async (t) => {
  await t
    .expect(tkPage.passElement.innerText)
    .eql('1')
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementPass);
  await t
    .expect(tkPage.passElement.innerText)
    .eql('2')
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementPass);
  await t
    .expect(tkPage.passElement.innerText)
    .eql('3')
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementPass);
  await t
    .expect(tkPage.passElement.innerText)
    .eql('2')
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementPass);
  await t
    .expect(tkPage.passElement.innerText)
    .eql('1')
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());
});
