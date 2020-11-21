import { DEFAULT_OPTIONS_CONTROLS } from '../../../src/ts/constants';
import { StateMessage } from '../../../src/ts/takecounter/components/MessageHandler';
import TakecounterPage from '../../page-objects/selectors';
import { customPressKey } from '../../utils/custom-press-key';
import { E2E_HOST } from '../../config/config';

const tkPage = new TakecounterPage();

const resetClear = fixture`Reset and clear`.page`${E2E_HOST}`.beforeEach(
  async (t) => {
    await customPressKey(DEFAULT_OPTIONS_CONTROLS.togglePassVisible);
    await t
      .expect(tkPage.passContainer.visible)
      .ok('Pass container needs to be visible for each test to pass');

    // Get the take counter to 2 and state current so we can ensure the pass counter does not effect it
    await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
    await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
    await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);

    await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementPass);
    await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementPass);

    await t
      .expect(tkPage.takeElement.innerText)
      .eql('2')
      .expect(tkPage.stateMessageElement.innerText)
      .eql(StateMessage.CURRENT.toUpperCase())
      .expect(tkPage.passElement.innerText)
      .eql('3');
  },
);

test('should let you reset the take and the pass together to the default', async (t) => {
  await t.setNativeDialogHandler((type) => {
    if (type === 'confirm') {
      return true;
    }
  });

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.resetAndClear);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('1')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.NEXT.toUpperCase())
    .expect(tkPage.passElement.innerText)
    .eql('1');
});

test('should not reset the take and the pass if you dismiss the confirm prompt', async (t) => {
  await t.setNativeDialogHandler((type) => {
    if (type === 'confirm') {
      return false;
    }
  });

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.resetAndClear);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(tkPage.stateMessageElement.innerText)
    .eql(StateMessage.CURRENT.toUpperCase())
    .expect(tkPage.passElement.innerText)
    .eql('3');
});
