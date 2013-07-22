var up, down, left, right;
var tempX = 90;
var tempY = 0;
var tempZ = 0;

document.onkeydown = function(keyEvent)
{    
    if (keyEvent.which == 87)
    {
        up = true;
    }
    if (keyEvent.which == 65)
    {
        left = true;
    }
    if (keyEvent.which == 83)
    {
        down = true;
    }
    if (keyEvent.which == 68)
    {
        right = true;
    }
}

document.onkeyup = function(keyEvent)
{
    if (keyEvent.which == 87)
    {
        up = false;
    }
    if (keyEvent.which == 65)
    {
        left = false;
    }
    if (keyEvent.which == 83)
    {
        down = false;
    }
    if (keyEvent.which == 68)
    {
        right = false;
    }
}

function turn(x, y) // where center is 0, 0
{
    var radians = Math.atan2(y, x);
    if (radians < 0)
    {
        radians = radians + 2 * Math.PI;
    }
    return radians;
}

function update()
{
    if (up == true)
    {
        tempX = 90 * Math.cos(((turn(tempX, tempY) * 180 / Math.PI) + 1) * Math.PI / 180); // Math.sqrt(3) * radius, where radius == 50
        tempY = 90 * Math.sin(((turn(tempX, tempY) * 180 / Math.PI) + 1) * Math.PI / 180);
    }
    if (down == true)
    {
        tempX = 90 * Math.cos(((turn(tempX, tempY) * 180 / Math.PI) - 1) * Math.PI / 180);
        tempY = 90 * Math.sin(((turn(tempX, tempY) * 180 / Math.PI) - 1) * Math.PI / 180);
    }
    if (left == true)
    {
        tempX = 90 * Math.cos(((turn(tempX, tempY) * 180 / Math.PI) + 1) * Math.PI / 180);
        tempZ = 90 * Math.sin(((turn(tempX, tempZ) * 180 / Math.PI) + 1) * Math.PI / 180);
    }
    if (down == true)
    {
        tempX = 90 * Math.cos(((turn(tempX, tempY) * 180 / Math.PI) - 1) * Math.PI / 180);
        tempZ = 90 * Math.sin(((turn(tempX, tempZ) * 180 / Math.PI) - 1) * Math.PI / 180);
    }
}


var animate = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;

var mainloop = function()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    update();
    for (index = 0; index < canvasData.data.length; index = index + 1) // clear the canvasData
    {
        canvasData.data[index] = 0;
    }
    flatCube = convert3D(cube, 50, {"xPosition": tempX, "yPosition": tempY, "zPosition": tempZ}, {"xPosition": 0, "yPosition": 0, "zPosition": 0});
    flatCube = removeDuplicates(flatCube);
    flatCube = shiftArray(flatCube, radius * 2, radius * 2);
    drawShape(flatCube, canvasData, 0, 0, 0, 255);
    ctx.putImageData(canvasData, 0, 0);
    ctx.putImageData(canvasData, 0, 0);
}

var recursiveAnimate = function()
{
    mainloop();
    animate(recursiveAnimate);
}

if (animate != null)
{
    animate(recursiveAnimate);
}
else
{
    setInterval(mainloop, 16);
}