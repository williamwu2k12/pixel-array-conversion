// last known working fiddle:
// http://jsfiddle.net/KbUSR/

function createArray(dimension, size, value, array)
{
	if (array == null || array == undefined)
	{
		array = new Array();
	}
	if (dimension == 1)
	{
		for (index = 0; index < size; index = index + 1)
		{
			array[index] = value;
		}
	}
	else
	{
		var indexLoop; // previously, the problem was that a new variable wasn't being declared, so the recursive function used the same iterators in the for loops
		for (indexLoop = 0; indexLoop < size; indexLoop = indexLoop + 1)
		{
			array[indexLoop] = createArray(dimension - 1, size, value, array[indexLoop]); // previously, calling the recursive function with array rather than array[indexLoop] was faulty
		}
	}
	return array;
}

function createCube(radius)
{
	var cornerArray = new Array();
	for (index = -radius; index < radius; index = index + 1)
	{
		cornerArray.push({"xPosition": -radius, "yPosition": -radius, "zPosition": index});
		cornerArray.push({"xPosition": radius, "yPosition": -radius, "zPosition": index});
		cornerArray.push({"xPosition": -radius, "yPosition": radius, "zPosition": index});
		cornerArray.push({"xPosition": radius, "yPosition": radius, "zPosition": index});
		cornerArray.push({"xPosition": -radius, "yPosition": index, "zPosition": -radius});
		cornerArray.push({"xPosition": radius, "yPosition": index, "zPosition": -radius});
		cornerArray.push({"xPosition": -radius, "yPosition": index, "zPosition": radius});
		cornerArray.push({"xPosition": radius, "yPosition": index, "zPosition": radius});
		cornerArray.push({"xPosition": index, "yPosition": -radius, "zPosition": -radius});
		cornerArray.push({"xPosition": index, "yPosition": -radius, "zPosition": radius});
		cornerArray.push({"xPosition": index, "yPosition": radius, "zPosition": -radius});
		cornerArray.push({"xPosition": index, "yPosition": radius, "zPosition": radius});
	}
	return cornerArray;
}

function convert3D(array, radius, point, center)
{
	var cornerArray = new Array();
	var vector = 
	{
		"xComponent": point.xPosition - center.xPosition,
		"yComponent": point.yPosition - center.yPosition,
		"zComponent": point.zPosition - center.zPosition
	}
	var perpendicular = 
	{
		"xComponent": Math.sqrt((vector.yComponent * vector.yComponent) / ((vector.xComponent * vector.xComponent) + (vector.yComponent * vector.yComponent))), // using dot product and cross product, since if dot product == 0, vectors are orthogonal, and cross product returns a vector perpendicular to both vector inputs
		"yComponent": Math.sqrt((vector.xComponent * vector.xComponent) / ((vector.xComponent * vector.xComponent) + (vector.yComponent * vector.yComponent))),
		"zComponent": 0
	}
	var normal = 
	{
		"xComponent": vector.yComponent * perpendicular.zComponent - vector.zComponent * perpendicular.yComponent,
		"yComponent": vector.zComponent * perpendicular.xComponent - vector.xComponent * perpendicular.zComponent,
		"zComponent": vector.xComponent * perpendicular.yComponent - vector.yComponent * perpendicular.xComponent
	}
	var factor = Math.sqrt(normal.xComponent * normal.xComponent + normal.yComponent * normal.yComponent + normal.zComponent * normal.zComponent); // originally there was an error because after cross producting the vector and its perpendicular, the magnitude/length of the vector was not 1, but it needs to be in order to create a correct grid
	normal.xComponent = normal.xComponent / factor;
	normal.yComponent = normal.yComponent / factor;
	normal.zComponent = normal.zComponent / factor;
	var shift = new Array(); // shift is a grid array, meaning it represents the values of the plane from the perspective/point you're viewing
	for (var index = Math.floor(Math.sqrt(3) * (-radius)); index < Math.sqrt(3) * (radius); index = index + 1)
	{
		shift.push(index);
	}
	var tempPoint;
	var tolerance = 0.05
	for (var indexA = 0; indexA < shift.length; indexA = indexA + 1)
	{
		for (var indexB = 0; indexB < shift.length; indexB = indexB + 1)
		{
			tempPoint = 
			{
				"xPosition": point.xPosition + (shift[indexA] * perpendicular.xComponent + shift[indexB] * normal.xComponent), // shifting by perpendicular (x on the tempPlane) and the normal (y on the tempPlane)
				"yPosition": point.yPosition + (shift[indexA] * perpendicular.yComponent + shift[indexB] * normal.yComponent),
				"zPosition": point.zPosition + (shift[indexA] * perpendicular.zComponent + shift[indexB] * normal.zComponent)
			}
			for (var index = 0; index < array.length; index = index + 1) // it's because vector components are too large
			{
				var diffX = vector.xComponent / (tempPoint.xPosition - array[index].xPosition);
				var diffY = vector.yComponent / (tempPoint.yPosition - array[index].yPosition);
				var diffZ = vector.zComponent / (tempPoint.zPosition - array[index].zPosition);
				if (diffX / diffY < 1 + tolerance && diffX / diffY > 1 - tolerance && diffX / diffZ < 1 + tolerance && diffX / diffZ > 1 - tolerance && diffZ / diffY < 1 + tolerance && diffZ / diffY > 1 - tolerance)
				{
					cornerArray.push({"xPosition": shift[indexA], "yPosition": shift[indexB]});
				}
			}
		}
	}
	return cornerArray;
}

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

var tempX = 67;
var tempY = 20;
var tempZ = 52;

var radius = 50;
var cube = createCube(radius);
var flatCube = convert3D(cube, 50, {"xPosition": tempX, "yPosition": tempY, "zPosition": tempZ}, {"xPosition": 0, "yPosition": 0, "zPosition": 0});
flatCube = removeDuplicates(flatCube);
flatCube = shiftArray(flatCube, radius * 2, radius * 2);

var canvas = document.getElementById("canvasID");
var ctx = canvas.getContext("2d");
var canvasData = ctx.createImageData(500, 500);
drawShape(flatCube, canvasData, 0, 0, 0, 255);
ctx.putImageData(canvasData, 0, 0);