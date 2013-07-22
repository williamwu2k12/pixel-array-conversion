/*
function createCubeOld(radius, red, green, blue, alpha)
{
	var cube = createArray(3, radius, [0, 0, 0, 0]);
	var color = [red, green, blue, alpha];
	for (indexD = 0; indexD < radius; indexD = indexD + 1)
	{
		cube[0][0][indexD] = color;
		cube[0][radius - 1][indexD] = color;
		cube[radius - 1][0][indexD] = color;
		cube[radius - 1][radius - 1][indexD] = color;
	}
	for (indexH = 0; indexH < radius; indexH = indexH + 1)
	{
		cube[0][indexH][0] = color;
		cube[0][indexH][radius - 1] = color;
		cube[radius - 1][indexH][0] = color;
		cube[radius - 1][indexH][radius - 1] = color;
	}
	for (indexW = 0; indexW < radius; indexW = indexW + 1)
	{
		cube[indexW][0][0] = color;
		cube[indexW][0][radius - 1] = color;
		cube[indexW][radius - 1][0] = color;
		cube[indexW][radius - 1][radius - 1] = color;
	}
	return cube;
}

function convert3DOld(array, point, center)
{
//	var flatArray = createArray(2, Math.floor(Math.sqrt(2) * array.length) + 1, [0, 0, 0, 0]);

	var cornerArray = new Array();

//	var x = center.xPosition + (point.xPosition - center.xPosition) * t;
//	var y = center.yPosition + (point.yPosition - center.yPosition) * t;
//	var z = center.zPosition + (point.zPosition - center.zPosition) * t;
	var vector = 
	{
		"xComponent": point.xPosition - center.xPosition,
		"yComponent": point.yPosition - center.yPosition,
		"zComponent": point.zPosition - center.zPosition
	}
	var perpendicular = 
	{
//		"xComponent": Math.sqrt((square(vector.yComponent) / (square(vector.xComponent) + square(vector.yComponent)))), // for some reason the square function doesn't work here
//		"yComponent": Math.sqrt((square(vector.xComponent) / (square(vector.yComponent) + square(vector.xComponent)))),
		"xComponent": Math.sqrt((vector.yComponent * vector.yComponent) / ((vector.xComponent * vector.xComponent) + (vector.yComponent * vector.yComponent))),
		"yComponent": Math.sqrt((vector.xComponent * vector.xComponent) / ((vector.xComponent * vector.xComponent) + (vector.yComponent * vector.yComponent))),
		"zComponent": 0
	}
	var normal = 
	{
		"xComponent": vector.yComponent * perpendicular.zComponent - vector.zComponent * perpendicular.yComponent,
		"yComponent": vector.zComponent * perpendicular.xComponent - vector.xComponent * perpendicular.zComponent,
		"zComponent": vector.xComponent * perpendicular.yComponent - vector.yComponent * perpendicular.xComponent
	}
	var shift = new Array(); // shift is a grid array, meaning it represents the plane from the perspective/point you're viewing

	for (index1 = (-array.length) / 2; index1 < array.length / 2; index1 = index1 + 1)
	{
		shift.push(index1);
	}

//	for (index1 = (-array.length) / 2; index1 < array.length / 2; index1 = index1 + 1)
//	{
//		for (index2 = (-array.length) / 2; index2 < array.length / 2; index2 = index2 + 1)
//		{
//			shift.push({"xComponent": index1, "yComponent": index2});
//		}
//	}

	var tempPoint;
//	vector.xComponent * perpendicular.xComponent + vector.yComponent * perpendicular.yComponent + vector.zComponent * perpendicular.zComponent == 0;
//	where (perpendicular.xComponent * perpendicular.xComponent) + (perpendicular.yComponent * perpendicular.yComponent) + (perpendicular.zComponent * perpendicular.zComponent) == 1;
//	then set perpendicular.zComponent == 0 such that you can solve for x and y;
	for (width = 0; width < array.length; width = width + 1)
	{
		for (height = 0; height < array[width].length; height = height + 1)
		{
			for (depth = 0; depth < array[width][height].length; depth = depth + 1)
			{
				for (indexA = 0; indexA < shift.length; indexA = indexA + 1)
				{
					for (indexB = 0; indexB < shift.length; indexB = indexB + 1)
					{
						tempPoint = 
						{
//							"xPosition": point.xPosition + (shift[index].xComponent * perpendicular.xComponent),
//							"yPosition": point.yPosition + (shift[index].yComponent * perpendicular.yComponent),
//							"zPosition": point.zPosition + 0
							"xPosition": point.xPosition + (shift[indexA] * perpendicular.xComponent + shift[indexB] * normal.xComponent),
							"yPosition": point.yPosition + (shift[indexA] * perpendicular.yComponent + shift[indexB] * normal.yComponent),
							"zPosition": point.zPosition + (shift[indexA] * perpendicular.zComponent + shift[indexB] * normal.zComponent)
						}
						if (array[width][height][depth] != [0, 0, 0, 0]) // then it's a point
						{
							if ((Math.abs(tempPoint.xPosition - width - vector.xComponent) < 1 && Math.abs(tempPoint.yPosition - height - vector.yComponent) < 1 && Math.abs(tempPoint.zPosition - depth - vector.zComponent) < 1) || (Math.abs(tempPoint.xPosition - width + vector.xComponent) < 1 && Math.abs(tempPoint.yPosition - height + vector.yComponent) < 1 && Math.abs(tempPoint.zPosition - depth + vector.zComponent) < 1)) // if the vectors are approximately the same
							{
								cornerArray.push({"xPosition": shift[indexA], "yPosition": shift[indexB]});
							}
						}
					}
				}
			}
		}
	}
	return cornerArray;
}
*/

/*
// old testing, disregard

var square = createArray(3, 3, "value");
console.log(square[0][0][0]); // keep in mind that when the array dimensions exceeds are higher, instead of displaying value, the console will display "object"

var cube = createCubeOld(20, 255, 0, 0, 255);
console.log(cube[0][0][0]);

var flatCube = convert3DOld(cube, {"xPosition": 0, "yPosition": 10, "zPosition": 10}, {"xPosition": 10, "yPosition": 10, "zPosition": 10});
console.log(flatCube);
*/


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

function createPyramid(radius)
{
	var cornerArray = new Array();
	for (index = -radius; index < radius; index = index + 1)
	{
		cornerArray.push({"xPosition": index, "yPosition": -radius, "zPosition": -radius}); // 4 corners of the base of the pyramid
		cornerArray.push({"xPosition": index, "yPosition": -radius, "zPosition": radius});
		cornerArray.push({"xPosition": -radius, "yPosition": -radius, "zPosition": index});
		cornerArray.push({"xPosition": radius, "yPosition": -radius, "zPosition": index});
	}
	var height = -radius;
	var slope = 2;
	var count = 0;
	for (index = -radius; index < 0; index = index + 1)
	{
		if (count == slope)
		{
			count = 0;
			height = height + 1;
		}
		cornerArray.push({"xPosition": index, "yPosition": height, "zPosition": index});
		cornerArray.push({"xPosition": index, "yPosition": height, "zPosition": -index});
		cornerArray.push({"xPosition": -index, "yPosition": height, "zPosition": index});
		cornerArray.push({"xPosition": -index, "yPosition": height, "zPosition": -index});
		count = count + 1;
	}
	return cornerArray;
}

function convert3D(array, radius, point, center, tolerance, scale)
{
	var cornerArray = new Array();
	var vector = 
	{
		"xComponent": point.xPosition - center.xPosition,
		"yComponent": point.yPosition - center.yPosition,
		"zComponent": point.zPosition - center.zPosition
	}
	var perpendicular;
	var yz = (vector.yComponent == 0 && vector.zComponent == 0);
	var xz = (vector.xComponent == 0 && vector.zComponent == 0);
	var xy = (vector.xComponent == 0 && vector.yComponent == 0);
	if (yz == false) // problem here was that it was necessary to have a 0 perpendicular component because there were three unknowns but only two equations, but this meant that if the original vector had 0 components in the wrong places, the perpendicular would evaluate to <0, 0, 0>
	{
		perpendicular = 
		{
			"xComponent": 0,
			"yComponent": Math.sqrt((vector.zComponent * vector.zComponent) / ((vector.zComponent * vector.zComponent) + (vector.yComponent * vector.yComponent))),
			"zComponent": Math.sqrt((vector.yComponent * vector.yComponent) / ((vector.zComponent * vector.zComponent) + (vector.yComponent * vector.yComponent)))
		}
	}
	else if (xz == false)
	{
		perpendicular = 
		{
			"xComponent": Math.sqrt((vector.zComponent * vector.zComponent) / ((vector.xComponent * vector.xComponent) + (vector.zComponent * vector.zComponent))),
			"yComponent": 0,
			"zComponent": Math.sqrt((vector.xComponent * vector.xComponent) / ((vector.xComponent * vector.xComponent) + (vector.zComponent * vector.zComponent)))
		}
	}
	else if (xy == false)
	{
		perpendicular = 
		{
			"xComponent": Math.sqrt((vector.yComponent * vector.yComponent) / ((vector.xComponent * vector.xComponent) + (vector.yComponent * vector.yComponent))), // using dot product and cross product, since if dot product == 0, vectors are orthogonal, and cross product returns a vector perpendicular to both vector inputs
			"yComponent": Math.sqrt((vector.xComponent * vector.xComponent) / ((vector.xComponent * vector.xComponent) + (vector.yComponent * vector.yComponent))),
			"zComponent": 0
		}
	}
	var normal = 
	{
		"xComponent": vector.yComponent * perpendicular.zComponent - vector.zComponent * perpendicular.yComponent,
		"yComponent": vector.zComponent * perpendicular.xComponent - vector.xComponent * perpendicular.zComponent,
		"zComponent": vector.xComponent * perpendicular.yComponent - vector.yComponent * perpendicular.xComponent
	}
	if (scale == undefined)
	{
		scale = 1;
	}
	perpendicular.xComponent = perpendicular.xComponent / scale;
	perpendicular.yComponent = perpendicular.yComponent / scale;
	perpendicular.zComponent = perpendicular.zComponent / scale;
	var factor = Math.sqrt(normal.xComponent * normal.xComponent + normal.yComponent * normal.yComponent + normal.zComponent * normal.zComponent); // originally there was an error because after cross producting the vector and its perpendicular, the magnitude/length of the vector was not 1, but it needs to be in order to create a correct grid
	normal.xComponent = normal.xComponent / (factor * scale);
	normal.yComponent = normal.yComponent / (factor * scale);
	normal.zComponent = normal.zComponent / (factor * scale);
	var shift = new Array(); // shift is a grid array, meaning it represents the values of the plane from the perspective/point you're viewing
	for (var index = Math.floor(Math.sqrt(3) * (-radius)); index < Math.sqrt(3) * (radius); index = index + 1)
	{
		shift.push(index);
	}
	var tempPoint;
	if (tolerance == undefined)
	{
		tolerance = 0.05;
	}
	var diffX, diffY, diffZ, diffXY, diffXZ, diffYZ;
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
				diffX = vector.xComponent / (tempPoint.xPosition - array[index].xPosition);
				diffY = vector.yComponent / (tempPoint.yPosition - array[index].yPosition);
				diffZ = vector.zComponent / (tempPoint.zPosition - array[index].zPosition);

				if ((vector.xComponent == 0 && yz != true) || (vector.yComponent == 0 && xz != true) || (vector.zComponent == 0 && xy != true)) // this was a problem because if vector components equaled zero, then the diff becomes zero, since zero divided by zero does not equal one; this is currently a temporary solution, as adding one artificially and illegally shifts the components, but it works to display a somewhat viewable front perspective
				{
					diffX = (vector.xComponent + 1) / (tempPoint.xPosition - array[index].xPosition + 1);
					diffY = (vector.yComponent + 1) / (tempPoint.yPosition - array[index].yPosition + 1);
					diffZ = (vector.zComponent + 1) / (tempPoint.zPosition - array[index].zPosition + 1);
				}
				diffXY = (diffX / diffY < 1 + tolerance && diffX / diffY > 1 - tolerance);
				diffXZ = (diffX / diffZ < 1 + tolerance && diffX / diffZ > 1 - tolerance);
				diffYZ = (diffY / diffZ < 1 + tolerance && diffY / diffZ > 1 - tolerance);
				if (diffXY && diffXZ && diffYZ)
				{
					cornerArray.push({"xPosition": shift[indexA], "yPosition": shift[indexB]});
				}
			}
		}
	}
	return cornerArray;
}



var radius = 50;
var cube = createCube(radius);
var flatCube = convert3D(cube, radius, {"xPosition": tempX, "yPosition": tempY, "zPosition": tempZ}, {"xPosition": 0, "yPosition": 0, "zPosition": 0});
flatCube = removeDuplicates(flatCube);
flatCube = shiftArray(flatCube, radius * 2, radius * 2);