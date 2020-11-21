import { DEFAULT_OPTIONS_CONTROLS } from '../../../src/ts/constants';
import { StateMessage } from '../../../src/ts/takecounter/components/MessageHandler';
import { E2E_HOST } from '../../config/config';
import TakecounterPage from '../../page-objects/selectors';
import { customPressKey } from '../../utils/custom-press-key';

const tkPage = new TakecounterPage();

const takeCountsFixture = fixture`Take count section`.page`${E2E_HOST}`;

test('should exist and be visible', async (t) => {
  await t
    .expect(tkPage.takeContainer.exists)
    .ok('Take container should exist')
    .expect(tkPage.takeElement.exists)
    .ok('Take element should exist')
    .expect(tkPage.takeContainer.visible)
    .ok('Take container should start visible')
    .expect(tkPage.takeElement.visible)
    .ok('Take element should start visible');
});

test('should allow you to increment and decrement the count', async (t) => {
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('1')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.NEXT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('1')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.NEXT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementTake);
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.NEXT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementTake);
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('1')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.NEXT.toUpperCase());

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementTake);
  await t
    .expect(tkPage.takeElement.innerText)
    .eql('1')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.NEXT.toUpperCase());
});
