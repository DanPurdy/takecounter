import { DEFAULT_OPTIONS_CONTROLS } from '../../../src/ts/constants';
import { E2E_HOST } from '../../config/config';
import TakecounterPage from '../../page-objects/selectors';
import { customPressKey } from '../../utils/custom-press-key';

const tkPage = new TakecounterPage();

const selectTake = fixture`Select take`.page`${E2E_HOST}`;

test('should let you select a take', async (t) => {
  let value = '10';
  await t.setNativeDialogHandler(
    (type) => {
      if (type === 'prompt') {
        return value;
      }
    },
    { dependencies: { value } },
  );

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.selectTake);
  await t.expect(tkPage.takeElement.innerText).eql(value);

  value = '20';
  await t.setNativeDialogHandler(
    (type) => {
      if (type === 'prompt') {
        return value;
      }
    },
    { dependencies: { value } },
  );

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.selectTake);
  await t.expect(tkPage.takeElement.innerText).eql(value);
});
