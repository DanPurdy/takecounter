import { ClientFunction } from 'testcafe';
import {
  DEFAULT_OPTIONS_CONTROLS,
  LOCALSTORAGE_HISTORY_KEY,
} from '../../../src/ts/constants';
import { E2E_HOST } from '../../config/config';
import TakecounterPage from '../../page-objects/selectors';
import { customPressKey } from '../../utils/custom-press-key';

const tkPage = new TakecounterPage();

const setLocalStorageItem = ClientFunction((prop: string, data: string) => {
  return localStorage.setItem(prop, data);
});

const getLocalStorageItem = ClientFunction((prop: string) => {
  return localStorage.getItem(prop);
});

const historyStatesFixture = fixture`History states`.page`${E2E_HOST}`;

test('write history to localstorage when incrementing takes', async (t) => {
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
    .eql(
      JSON.stringify({ '1': 2 }),
      'Localstorage should contain the correct history',
    );

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('3')
    .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
    .eql(
      JSON.stringify({ '1': 3 }),
      'Localstorage should contain the correct history',
    );

  const value = '20';
  await t.setNativeDialogHandler(
    (type) => {
      if (type === 'prompt') {
        return value;
      }
    },
    { dependencies: { value } },
  );
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.selectTake);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql(value)
    .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
    .eql(
      JSON.stringify({ '1': parseInt(value, 10) }),
      'Localstorage should contain the correct history',
    );

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementTake);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('19')
    .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
    .eql(
      JSON.stringify({ '1': 19 }),
      'Localstorage should contain the correct history',
    );
});

test('write history to localstorage when incrementing takes', async (t) => {
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.togglePassVisible);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementPass);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.incrementTake);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('3')
    .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
    .eql(
      JSON.stringify({ '1': 2, '2': 3 }),
      'Localstorage should contain the correct history',
    );

  await customPressKey(DEFAULT_OPTIONS_CONTROLS.decrementTake);

  await t
    .expect(tkPage.takeElement.innerText)
    .eql('2')
    .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
    .eql(
      JSON.stringify({ '1': 2, '2': 2 }),
      'Localstorage should contain the correct history',
    );
});
test.before(async (t) => {
  setLocalStorageItem(
    LOCALSTORAGE_HISTORY_KEY,
    JSON.stringify({ '1': 2, '2': 3, '3': 5 }),
  );

  await t.setNativeDialogHandler((type) => {
    if (type === 'confirm') {
      return false;
    }
  }, {});
})(
  'should not load history and then clear history if the user declines to load it when at launch',
  async (t) => {
    await t
      .expect(tkPage.takeElement.innerText)
      .eql('1')
      .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
      .eql(
        JSON.stringify({ '1': 1 }),
        'Localstorage should contain the correct history',
      );
  },
);
test.before(async (t) => {
  await setLocalStorageItem(
    LOCALSTORAGE_HISTORY_KEY,
    JSON.stringify({ '1': 2, '2': 3, '3': 5 }),
  );

  await t.setNativeDialogHandler((type) => {
    if (type === 'confirm') {
      return true;
    }
  }, {});

  await t.wait(2000);
  await t.eval(() => location.reload(true));
  await customPressKey(DEFAULT_OPTIONS_CONTROLS.togglePassVisible);
})(
  'check historical values and load previously stored take values when incrementing/decrementing passes',
  async (t) => {
    await t
      .expect(getLocalStorageItem(LOCALSTORAGE_HISTORY_KEY))
      .eql(
        JSON.stringify({ '1': 2, '2': 3, '3': 5 }),
        'Localstorage should contain the correct history',
      )
      .expect(tkPage.takeElement.innerText)
      .eql('5', 'Should match the highest take in the history')
      .expect(tkPage.passElement.innerText)
      .eql('3', 'Should match the highest pass in the history');
  },
);
