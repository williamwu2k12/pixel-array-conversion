Pixel Array Conversion

----------------------------------------------------------------------------------------------------

Purpose:
- create a three dimensional array of corners of an object
- flatten array
	- using shifted vectors and points, determine if position in array is on line
		- mark position of line in its perpendicular plane as a pixel to be rendered
- display using canvas methods
	- createImageData(), putImageData()
- optimize for efficiency, if possible

----------------------------------------------------------------------------------------------------

Instructions:
- navigate to http://jsfiddle.net/KbUSR/
- use jsfiddle or create html page with following:
	- html: "<canvas id="canvasID" width:"500" height:"500"></canvas>" (without quotes)
	- css: null
	- javascript: contents of "Main.js"

----------------------------------------------------------------------------------------------------

Bugs:
07-20-13: flattened cube is stretched or unviewable at some points, particularly those closer to 0, 0, 0
07-20-13: animate not working properly, possibly because the render and calculate time is roughly 3 seconds