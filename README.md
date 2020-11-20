# Takecounter

Takecounter is a simple web application designed to allow anyone to keep track of and display takes and passes in a Recording studio environment, or indeed anywhere that may require a take counter!

Initially built as a jQuery plugin in my early days learning web development ~2013 during my time working at Angel Recording Studios in London. The initial project ran in chromium on Raspberry Pi using a dedicated numpad attached via usb. 

Updated the project to move away from jQuery and into a maintainable typescript project in 2020 to add some functionality and fix some long-standing issues on request from a current Abbey Road engineer and you know... the pandemic and all that..

Also serving as a demo i've been using to illustrate composition over inheritance in typescript.

A working demo can currently be found running at [https://takecounter.dpurdy.dev](https://takecounter.dpurdy.dev)

## Building the project

We use parcel to build this project.

```
npm i
```


If you're wanting to deploy to a webserver run the following command and then upload the contents of the dist folder to your webhosting.

```
npm run build
```

If you want to open the index.html file directly and run manually from your filesystem then the following command can be used and then copy the dist folder to wherever you ant on your own system.

```
npm run build-download
```

Finally to run locally, run the following and then visit [http://localhost:1234](http://localhost:1234)

```
npm run dev
```


---

## elements

Takecounter requires you to pass in selectors for all the elements it requires to manipulate. Personally i like to use data elements as anchors for this but you can use whatever you want as long as they're provided. Takecounter will do a basic check on startup that these selectors exist in the DOM if they don't an error will be thrown. Please ensure you create your DOM strucutre before attaching Takecounter.

```js
{
  passContainer: document.querySelector('[data-tag="pass-container"]'),
  passElement: document.querySelector('[data-tag="pass-element"]'),
  takeContainer: document.querySelector('[data-tag="take-container"]'),
  takeElement: document.querySelector('[data-tag="take-element"]'),
  stateElement: document.querySelector('[data-tag="state-message"]'),
},
```

---

## options

Takecounter accepts an options object to allow customisation and user defined control

| Key  | type | Default value | Notes |
| ---------------|--------------| ----------------------------| - |
| `controls`     | `Object{}`   | [see controls](#controls)    | |
| `modifiers`    | `Object{}`   | [see modifiers](#modifiers)  | |
| `hidePassOnStartup` | `bool`  | false | The pass section will not be hidden by default set to true to enable Takes only mode (or user the togglePassVisible control) |
| `initialPass`  | `number`     | 1 | |
| `initialTake`  | `number`     | 1 | |
| `maxPassCount` | `number`     | 999 | |
| `minPassCount` | `number`     | 1  | |
| `maxTakeCount` | `number`     | 9999  | |
| `minTakeCount` | `number`     | 1  | |
| `resetTakeOnNewPass` | `bool` | false  | Will reset pass to 0 when you start a new take|

### Controls (options.controls)
---

This is the list of key binds to control the takecounter, update freely to any keys you like. For a complete list of key codes and to test your own keys visit [keycode.info](http://keycode.info) takecounter supports the use of any `event.code`. Earlier versions used `keyCode` which is now deprecated.

| Key  | Default value |
| ------------- | ------------- |
| `incrementTake` | `NumpadAdd` |
| `decrementTake` | `NumpadSubtract` |
| `selectTake` | `NumpadMultiply` |
| `incrementPass` | `Numpad6` |
| `decrementPass` | `Numpad9` |
| `initiateNewPass` | `Numpad7` |
| `togglePassVisible` | `Numpad4` |
| `resetAndClear` | `NumpadDecimal` |


### Modifiers (options.modifiers)
---

The classes added to the pass/take elements when switching between take only and take/pass mode.

| Key                  | type     | Default value | Notes |
| -------------------- | -------- | ------------- | ------|
| `activeClassName`    | `string` | `'hidden'`      | The class name added to the state message section when active (state CURRENT) |
| `hiddenClassName`    | `string` | `'hidden'`      | The class name added to the pass container when hidden |
| `fullWidthClassName` | `string` | `'full-width'`  | The class name added to the take container when the pass container is hidden |


You can see a basic setup below

```js
import TakeCounter from './takecounter/TakeCounter';

const myTakeCounterApp = new TakeCounter(
  {
    passContainer: document.querySelector('[data-tag="pass-container"]'),
    passElement: document.querySelector('[data-tag="pass-element"]'),
    takeContainer: document.querySelector('[data-tag="take-container"]'),
    takeElement: document.querySelector('[data-tag="take-element"]'),
    stateElement: document.querySelector('[data-tag="state-message"]'),
  },
  // Options object below is optional and for example only here
  {
    hidePassOnStartup: true,
    maxPassCount: 100,
    controls: {
      incrementTake: 'NumpadAdd',
      decrementTake: 'NumpadSubtract',
    },
    modifiers: {
      hiddenClassName: 'take-counter__section--hidden',
      fullWidthClassName: 'take-counter__section--full',
    },
  },
);
```


