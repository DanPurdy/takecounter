import { ClientFunction } from 'testcafe';

export const customPressKey = ClientFunction((code) => {
  const event = new KeyboardEvent('keydown', { code });

  window.dispatchEvent(event);
});
