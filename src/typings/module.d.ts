interface TakeCounterElements {
  passContainer: HTMLElement;
  passElement: HTMLElement;
  takeContainer: HTMLElement;
  takeElement: HTMLElement;
  stateElement: HTMLElement;
}

interface TakeCounterModifiers {
  activeClassName?: string;
  hiddenClassName?: string;
  fullWidthClassName?: string;
}

interface TakeCounterControls {
  incrementTake?: string;
  decrementTake?: string;
  selectTake?: string;
  incrementPass?: string;
  decrementPass?: string;
  intiateNewPass?: string;
  togglePassVisible?: string;
  resetAndClear?: string;
}

interface TakeCounterOptions {
  controls?: TakeCounterControls;
  modifiers?: TakeCounterModifiers;
  hidePassOnStartup?: boolean;
  initialPass?: number;
  initialTake?: number;
  maxPassCount?: number;
  minPassCount?: number;
  maxTakeCount?: number;
  minTakeCount?: number;
  resetTakeOnNewPass?: boolean;
}
