function shiftCorners(cornerArray, distanceX, distanceY) // shift from origin at 0, 0 to top-left corner, whilst inverting the y axis
{
    var shiftedArray = cornerArray;
    for (index = cornerArray.length; index > 0; index = index - 1)
    {
        shiftedArray[index - 1].xPosition = shiftedArray[index - 1].xPosition + distanceX;
        shiftedArray[index - 1].yPosition = -(shiftedArray[index - 1].yPosition - (distanceY + 1)); // the plus one is because coordinates with 0 will not show
    }
    return shiftedArray;
}

function shiftArray(cornerArray, distanceX, distanceY) // consistent with the common 'positive is up' screen x and y orientation
{
    var shiftedArray = cornerArray;
    for (index = 0; index < cornerArray.length; index = index + 1)
    {
        shiftedArray[index].xPosition = shiftedArray[index].xPosition + distanceX;
        shiftedArray[index].yPosition = shiftedArray[index].yPosition + distanceY;
    }
    return shiftedArray;
}

function invertArray(cornerArray)
{
    var invertedArray = cornerArray;
    for (index = 0; index < cornerArray.length; index = index + 1)
    {
        invertedArray[index].yPosition = -invertedArray[index].yPosition;
    }
    return invertedArray;
}

function drawShape(cornerArray, imageData, red, green, blue, alpha)
{
    for (index = 0; index < cornerArray.length; index = index + 1)
    {
        var pixelIndex = cornerArray[index].xPosition + ((cornerArray[index].yPosition - 1) * imageData.width); // imageData.width is how many full lines you need to move
        imageData.data[4 * pixelIndex + 0] = red;
        imageData.data[4 * pixelIndex + 1] = green;
        imageData.data[4 * pixelIndex + 2] = blue;
        imageData.data[4 * pixelIndex + 3] = alpha;
    }
}

function removeDuplicates(cornerArray)
{
    var returnArray = new Array();
    var index1 = 0;
    var index2 = 0;
    var bool = true;
    while (index1 < cornerArray.length)
    {
        bool = true;
        index2 = 0;
        while (index2 < returnArray.length)
        {
            if (cornerArray[index1].xPosition == returnArray[index2].xPosition && cornerArray[index1].yPosition == returnArray[index2].yPosition && cornerArray[index1].zPosition == returnArray[index2].zPosition)
            {
                bool = false;
                break;
            }
            index2 = index2 + 1;
        }
        if (bool == true)
        {
            returnArray.push(cornerArray[index1]);
        }
        index1 = index1 + 1;
    }
    return returnArray;
}



var canvas = document.getElementById("canvasID");
var ctx = canvas.getContext("2d");
var canvasData = ctx.createImageData(500, 500);
drawShape(flatCube, canvasData, 0, 0, 0, 255);
ctx.putImageData(canvasData, 0, 0);