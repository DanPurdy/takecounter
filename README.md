# Takecounter

[![CircleCI](https://circleci.com/gh/DanPurdy/takecounter.svg?style=svg)](https://circleci.com/gh/DanPurdy/takecounter)
[![Coverage Status](https://coveralls.io/repos/github/DanPurdy/takecounter/badge.svg?branch=main)](https://coveralls.io/github/DanPurdy/takecounter?branch=main)

Takecounter is a simple web application designed to allow anyone to keep track of and display takes and passes in a recording studio environment, or indeed anywhere that you may require a take counter!

Initially built as a jQuery plugin in my early days of learning web development ~2013 and during my time working at Angel Studios in London. The initial project ran in chromium on a Raspberry Pi using a dedicated numpad attached via USB. 

The updated project moves away from jQuery and into a maintainable TypeScript project and to add some functionality and to fix some long-standing issues by request from an Abbey Road engineer and you know... the pandemic and all of that..

Also serving as a demo i've been using to illustrate composition over inheritance in TypeScript.

A working demo can currently be found running at [https://takecounter.dpurdy.dev](https://takecounter.dpurdy.dev)

## Building the project

We use Parcel to build this project.

```
npm i
```


If you're wanting to deploy to a webserver run the following command and then upload the contents of the dist folder to your web-host.

```
npm run build
```

If you want to open the index.html file directly and run manually from your filesystem then the following command can be used and then copy the contents of the dist folder to wherever you want on your own system and open the index.html file.

```
npm run build-download
```

Finally to run the dev build locally or to contribute, run the following and then visit [http://localhost:1234](http://localhost:1234)

```
npm run dev
```

TODO

See the [project roadmap](https://github.com/DanPurdy/takecounter/projects/1)

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
| `controls`     | `Object{}`   | [see controls](#controls-optionscontrols)    | |
| `modifiers`    | `Object{}`   | [see modifiers](#modifiers-optionsmodifiers)  | |
| `disablePassHistoryLoad` | `bool`  | true | If you increment or decrement a pass that already has a historical take count then it would load the take to match what you had on that pass. (see [history management](#history-management)) |
| `hidePassOnStartup` | `bool`  | false | The pass section will not be hidden by default set to true to enable take only mode (or use the togglePassVisible method to switch between the two) |
| `initialPass`  | `number`     | 1 | |
| `initialTake`  | `number`     | 1 | |
| `maxPassCount` | `number`     | 999 | |
| `minPassCount` | `number`     | 1  | |
| `maxTakeCount` | `number`     | 9999  | |
| `minTakeCount` | `number`     | 1  | |
| `resetTakeOnNewPass` | `bool` | false  | Will reset take to the initial take count when you start a new pass |

### Controls (options.controls)
---

This is the list of default key binds to control the takecounter, update freely to any keys you like. For a complete list of key codes and to test your own keys visit [keycode.info](http://keycode.info). Takecounter supports the use of any `event.code`. Earlier versions used `keyCode` which is now deprecated.

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
  // elements
  {
    passContainer: document.querySelector('[data-tag="pass-container"]'),
    passElement: document.querySelector('[data-tag="pass-element"]'),
    takeContainer: document.querySelector('[data-tag="take-container"]'),
    takeElement: document.querySelector('[data-tag="take-element"]'),
    stateElement: document.querySelector('[data-tag="state-message"]'),
  },
  // options object below is optional and for example only here see above for details of each option
  {
    hidePassOnStartup: true,
    maxPassCount: 100,
    controls: {
      incrementTake: 'NumpadAdd',
      decrementTake: 'NumpadSubtract',
    },
    modifiers: {
      activeClassName: 'state-section--active',
      hiddenClassName: 'take-counter__section--hidden',
      fullWidthClassName: 'take-counter__section--full',
    },
  },
);
```

### History Management
---

To help you spend less time configuring takecounter it will track your pass and take history as you use it. This history will be stored in the localstorage of your browser in key value format

i.e.
```js
{pass#: take#}
```
which would look like
```js
// pass 1 - take 1
// pass 2 - take 20
// pass 3 - take 450
{"1": 1, "2": 20, "3": 450}
```

If you have to restart your browser for some reason during a session or just next time you return to the takecounter in the same browser you will be asked if you wish to reload your previous state. If you choose not to then you will be restored to a fresh start of takecounter i.e. pass 1 take 1. However, if you choose yes then your session will be restored and you'll be started on the latest pass/take. In the example above you would be started at pass 3 take 450.

If you don't use passes then your take history will just be stored against pass 1 and you should notice no other differences.

#### options.disablePassHistoryLoad

By default this option is set to `true`

This option allows you to move between passes and restore the take to where it was when you moved to a different pass.

Here's an example of how it would work if you have this option set to `false`

Im on pass 1 and I go through 10 takes. My history would look like 

```js
{"1": 10}
``` 

I then move to take 2 and do another 10 takes

```js
{"1": 10, "2": 20 }
```

Now i decide to go back to pass 1 - my takes will be reset to 10 and i can continue from there. However i made a mistake and actually i wanted to be on pass 2 after all - i use the increment pass button to go back to pass 2 and my takes are reset to 20 where i left off.

In the case that this option is set to `true` (as it is by default), whenever i increment or decrement takes my take number will not change and i can use passes and takes completely independently.

