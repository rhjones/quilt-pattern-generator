// set up standard quilt dimensions in inches
var dimensions = {
	lap: [36, 36],
	twin: [66, 96],
	full: [84, 96],
	queen: [90, 96],
	king: [102, 96]
}

// neon polychrome

var neon = ['rgba(43, 164, 67, 1)', 'rgba(198, 254, 93, 1)', 'rgba(27, 34, 99, 1)', 'rgba(223, 143, 65, 1)', 'rgba(30, 124, 100, 1)', 'rgba(242, 60, 34, 1)'];


// array to hold individual quilt block drawing functions
var blocktypes = [square, hstTopLeft, hstTopRight, hstBottomLeft, hstBottomRight];

// locate key DOM elements
var submit = document.getElementById('submit');
var squareCount = document.getElementById('squares');
var hstCount = document.getElementById('hsts')
var fabricA = document.getElementById('fabricA');
var fabricB = document.getElementById('fabricB');
var fabA = document.getElementById('fabA');
var fabB = document.getElementById('fabB');

// get the canvas, context, and container div (#canvascont)
var canvas = document.getElementById('quiltcanvas');
var ctx = canvas.getContext('2d');
var container = canvas.parentNode;

// does the canvas have a quilt drawn on it?
var drawn = false;

// set up a global blockWidth variable
var blockWidth;
var columns;
var rows;

// Run function when browser resizes
$(window).resize( resizeCanvas );

// resize the canvas width according to the width of the container div
function resizeCanvas()	{
	var qw = container.offsetWidth;
	var ratio = canvas.height / canvas.width;
	var qh = qw * ratio;

	/* 	
		note: only resizing style, not actual canvas.width and canvas.height
		resizing canvas.width and .height clears canvas
		resizing style scales canvas
	*/
	canvas.style.width = qw + 'px';
	canvas.style.height = qh + 'px';
}

//Initial call
resizeCanvas();

submit.onclick = function(event) {
	event.preventDefault();
	
	// remove previous quilt design by clearing canvas
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	// reset the drawn variable 
	drawn = false;
	
	// remove any existing warnings
	// http://stackoverflow.com/questions/10842471/remove-all-elements-with-a-certain-class-with-javascript
	var alertMsgs = document.getElementsByClassName('alertmsg');
	while (alertMsgs[0]) {
		alertMsgs[0].parentNode.removeChild(alertMsgs[0]);
	}
	var warnings = document.getElementsByClassName('warning');
	while (warnings[0]) {
		warnings[0].className = '';
	}
	
	// reset square/HST count and block size
	var squares = 0;
	var hsts = 0;

	// get data from form
	var quiltSize = document.getElementById('quiltsize').value;
	var blockSize = Number(document.getElementById('blocksize').value);

	// determine desired dimensions for quilt in inches
	var wid = dimensions[quiltSize][0];
	var len = dimensions[quiltSize][1];

	// determine number of rows and columns based on quilt and block size
	columns = wid / blockSize;
	rows = len / blockSize;

	// set up canvas
	/* 	
		have to resize both .width and .style.width to make sure that
	  	canvas drawing surface is the right size
	  	and that things are scaled appropriately
	*/
	canvas.width = container.offsetWidth;
	canvas.style.width = canvas.width + 'px';
	blockWidth = ctx.canvas.width / columns;
	canvas.height = blockWidth * rows;
    canvas.style.height = canvas.height + 'px';

	// set up a block fill color for Fabric A
	ctx.fillStyle = neon[Math.floor(Math.random() * neon.length)];
	fabA.style.background = ctx.fillStyle;

	// set up (a, b, c, d) for drawing
	var a = 0;
	var b = 0;

	for (i = 0; i < rows; i++) {
		for (j = 0; j < columns; j++) {
			var newBlockType = blocktypes[Math.floor(Math.random() * blocktypes.length)];
			if (newBlockType === blocktypes[0]) {
					squares++;
				} else {
					hsts++;
				}
			newBlockType(a,b);
			a += blockWidth;
		}
		a = 0;
		b += blockWidth;
	}

	// add a border
	canvas.className = 'border';

	// set the drawn variable to true;
	drawn = true;

	// update square and HST count on page
	squareCount.textContent = 'Squares: ' + squares;
	hstCount.textContent = 'Half Square Triangles: ' + hsts;

	// determine yardage

	var yardage = function(cutSize, blockCount) {

		// calculate maximum # of blocks per strip
		var blocksPerStrip = Math.floor(40 / cutSize);

		// calculate minimum # of strips needed
		var strips = Math.ceil(blockCount / blocksPerStrip);

		// determine fabric yardage, based on # of strips
		var stripsPerYard = (strips * cutSize) / 36;
		return(Math.ceil(stripsPerYard * 4) / 4).toFixed(2);
	}

	// unfinished cut blocksize for squares = size + 0.5"
	var ydSquares = yardage((blockSize + 0.5), squares);

	// unfinished cut blocksize for HSTs = size + 0.875"
	var ydFabricB = yardage((blockSize + 0.875), (hsts / 2));

	var ydFabricA = Number(ydSquares) + Number(ydFabricB);

	fabricA.textContent = ydFabricA + ' yards';
	fabricB.textContent = ydFabricB + ' yards';

}

function square(a,b) {
	ctx.fillRect(a,b,blockWidth,blockWidth);
}

function hstTopLeft(a,b) {
	var path = new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockWidth,b);
    path.lineTo(a,b + blockWidth);
    ctx.fill(path);
}

function hstTopRight(a,b) {
	var path = new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockWidth, b);
    path.lineTo(a + blockWidth,b + blockWidth);
    ctx.fill(path);
}

function hstBottomLeft(a,b) {
	var path = new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockWidth,b + blockWidth);
    path.lineTo(a, b + blockWidth);
    ctx.fill(path);
}

function hstBottomRight(a,b) {
	var path = new Path2D();
    path.moveTo(a + blockWidth,b);
    path.lineTo(a + blockWidth,b + blockWidth);
    path.lineTo(a, b + blockWidth);
    ctx.fill(path);
}







