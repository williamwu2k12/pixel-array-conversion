Pixel Array Conversion

----------------------------------------------------------------------------------------------------

Created almost entirely from scratch, this project attempts to convert a 3D pixel array to a 2D viewable array, and then draw on screen. jQuery is the only library used, and then only for its $(document).ready() function, which was needed to ensure everything was displayed.

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
- open main.html; play around with tempX, tempY, tempZ, and radius OR
- navigate to http://jsfiddle.net/KbUSR/ (old link, don't use) OR
- use jsfiddle or create html page with following:
	- html: "<canvas id="canvasID" width:"500" height:"500"></canvas>" (without quotes)
	- css: null
	- javascript: contents of "main.js"

----------------------------------------------------------------------------------------------------

Bugs:
07-22-13: pyramid currently not working, may be problem with the original pixel array
07-21-13: stretching confirmed to occur at 4 of 8 cube corners, but unviewable front perspective temporarily patched
07-20-13: flattened cube is stretched or unviewable at some points, particularly those closer to 0, 0, 0
07-20-13: animate not working properly, possibly because the render and calculate time is roughly 3 seconds