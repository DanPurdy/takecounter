# Takecounter

Takecounter is a simple web application designed to allow anyone to keep track of and display takes and passes in a Recording studio environment, or indeed anywhere that may require a take counter!

Initially built as a jQuery plugin in my early days learning web development ~2013 during my time working at Angel Recording Studios in London. The initial project ran in chromium on Raspberry Pi using a dedicated numpad attached via usb. 

Updated the project to move away from jQuery and into a maintainable typescript project in 2020 to add some functionality and fix some long-standing issues on request from a current Abbey Road engineer and you know... the pandemic and all that..

Also serving as a demo i've been using to illustrate composition over inheritance in typescript.

A working demo can currently be found running at [https://takecounter.dpurdy.dev](https://takecounter.dpurdy.dev)

---

## options

Takecounter accepts an options object to allow customisation and user defined control

| Key  | type | Default value | Notes |
| ---------------|--------------| ----------------------------| - |
| `controls`     | `Object{}`   | [see controls](#controls)    | |
| `modifiers`    | `Object{}`   | [see modifiers](#modifiers)  | |
| `hidePassOnStartup` | `bool`  | true | The pass section will be hidden by default i.e. Takes only |
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
| `intiateNewPass` | `Numpad7` |
| `togglePassVisible` | `Numpad4` |
| `resetAndClear` | `NumpadDecimal` |


### Modifiers (options.modifiers)
---

The classes added to the pass/take elements when switching between take only and take/pass mode.

| Key                  | type     | Default value | Notes |
| -------------------- | -------- | ------------- | ------|
| `hiddenClassName`    | `string` | `'hidden'`      | The class name added to the pass container when hidden |
| `fullWidthClassName` | `string` | `'full-width'`  | The class name added to the take container when the pass container is hidden |




