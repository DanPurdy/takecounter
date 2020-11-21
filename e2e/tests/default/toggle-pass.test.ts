import { DEFAULT_OPTIONS_CONTROLS } from '../../../src/ts/constants';
import { E2E_HOST } from '../../config/config';
import TakecounterPage from '../../page-objects/selectors';
import { customPressKey } from '../../utils/custom-press-key';

const tkPage = new TakecounterPage();

const togglePassFixture = fixture`Toggle the pass container visibility`
  .page`${E2E_HOST}`;

test('It should allow you to toggle the pass field', async (t) => {
  await t
    .expect(tkPage.passContainer.exists)
    .ok('Pass container should exist')
    .expect(tkPage.passContainer.visible)
    .notOk('Pass container should start hidden');

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.togglePassVisible);
  await t.wait(1000);

  await t
    .expect(tkPage.passContainer.visible)
    .ok('Pass container should be visible');

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.togglePassVisible);
  await t.wait(1000);

  await t
    .expect(tkPage.passContainer.visible)
    .notOk('Pass container should be hidden');
});
