export const HIDDEN_CLASSNAME: string = 'hidden';
export const FULL_WIDTH_CLASSNAME: string = 'full-width';
export const ACTIVE_MESSAGE_SECTION_CLASS = 'message-current';

export const DEFAULT_OPTIONS = {
  hidePassOnStartup: false,
  initialPass: 1,
  initialTake: 1,
  maxPassCount: 999,
  minPassCount: 1,
  maxTakeCount: 9999,
  minTakeCount: 1,
  resetTakeOnNewPass: false,
  controls: {
    incrementTake: 'NumpadAdd',
    decrementTake: 'NumpadSubtract',
    selectTake: 'NumpadMultiply',
    incrementPass: 'Numpad6',
    decrementPass: 'Numpad9',
    initiateNewPass: 'Numpad7',
    togglePassVisible: 'Numpad4',
    resetAndClear: 'NumpadDecimal',
  },
  modifiers: {
    activeClassName: ACTIVE_MESSAGE_SECTION_CLASS,
    hiddenClassName: HIDDEN_CLASSNAME,
    fullWidthClassName: FULL_WIDTH_CLASSNAME,
  },
} as TakeCounterOptions;
