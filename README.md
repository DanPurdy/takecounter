# Takecounter
===========

JQuery based takecounter for use in a Recording studio environment, or indeed anywhere requiring a take counter!

Incorporates takes and passes (currently restricted to 999 of each in that configuration).
Also incorporates a take only mode (no passes and full width. Take limit is 999999 in this config)

The limits can easily be changed, I just selected these limits to meet the balance between useful font size and space used.

I personally use this off of a Raspberry Pi with a usb numpad attached either via the video out or the hdmi out.

A woking demo can be found at www.danpurdy.co.uk/demo/takecounter

Responsive design so it should adjust to different resolutions correctly depending on your setup.

Currently set to work with a numpad.

Default controls and their actions can be seen in **controls.txt**

To modify the controls the takeCounter call accepts an options variable as an object.

You can pass any keycode to any of the specified parameters as shown below to modify the controls for that action.
```
takeCounter({
	takeUp : 107, //plus symbol (+)
	takeDown : 109, //minus symbol (-)
	takeSel : 106, //asterix (*)
	passUp : 102, //6 Key (6)
	passDown : 105, //9 Key (9)
	passNewInit : 103, //7 Key (7)
	togglePass : 100, //4 Key (4)
	countReset : 110, //period key (.)
});
```
For a basic list of keyboard keycodes please see here www.webonweboff.com/tips/js/event_key_codes.aspx



