// set up standard quilt dimensions in inches
var dimensions = {
	lap: [36, 36],
	twin: [66, 96],
	full: [84, 96],
	queen: [90, 96],
	king: [102, 96]
}

/* set up color palettes */
var scheme;

// neon polychrome
// http://www.colourlovers.com/palette/2723761/N_e_o_n_~
var neon = ['rgba(0,255,200,1)', 'rgba(255,179,0,1)', 'rgba(176,255,5,1)', 'rgba(255,0,102,1)', 'rgba(112,141,145,1)'];

// pool polychrome
// http://www.colourlovers.com/palette/3078564/%E3%82%A2%E3%83%BC%E3%83%86%E3%82%A3%E3%82%B9%E3%83%88_CLAD
var pool = ['rgba(52,194,182,1)', 'rgba(251,246,40,1', 'rgba(202,196,208,1)', 'rgba(182,241,29,1)', 'rgba(5,131,156,1)'];

// wes anderson polychrome
// http://wesandersonpalettes.tumblr.com/post/79956897654/coming-soon
var wes = ['rgba(190,168,28,1)', 'rgba(123,136,95,1', 'rgba(83,143,105,1)', 'rgba(59,70,59,1)', 'rgba(154,50,0,1)'];

// array to hold individual quilt block drawing functions
var blocktypes = [square, hstTopLeft, hstTopRight, hstBottomLeft, hstBottomRight];

// locate key DOM elements
var submit = document.getElementById('submit');
var squareCount = document.getElementById('squares');
var hstCount = document.getElementById('hsts');
var hstTL = document.getElementById('hstTL');
var hstTR = document.getElementById('hstTR');
var hstBL = document.getElementById('hstBL');
var hstBR = document.getElementById('hstBR');
var fabrics = document.getElementsByClassName('fabric');
var fabricA = document.getElementById('fabricA');
var fabricB = document.getElementById('fabricB');
var fabricC = document.getElementById('fabricC');
var fabricD = document.getElementById('fabricD');
var fabricE = document.getElementById('fabricE');
var fabricF = document.getElementById('fabricF');

// get the canvas, context, and container div (#canvascont)
var canvas = document.getElementById('quiltcanvas');
var ctx = canvas.getContext('2d');
var container = canvas.parentNode;

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

	// validate form data
	var valQuiltSize = validate('quiltsize');
	var valBlockSize = validate('blocksize');
	if (valQuiltSize === false || valBlockSize === false) {
		return false;
	} else {

		// remove previous quilt design by clearing canvas
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		// reset square/HST count and block size
		var squares = 0;
		var hsts = 0;
		var hstsTL = 0;
		var hstsTR = 0;
		var hstsBL = 0;
		var hstsBR = 0;

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
		// ctx.fillStyle = neon[Math.floor(Math.random() * neon.length)];
		scheme = wes;
		for (var i = 0; i < scheme.length; i++) {
			fabrics[i + 1].style.background = scheme[i];
		}

		// set up (a, b, c, d) for drawing
		var a = 0;
		var b = 0;

		for (i = 0; i < rows; i++) {
			for (j = 0; j < columns; j++) {
				var newBlockType = blocktypes[Math.floor(Math.random() * blocktypes.length)];
				switch (newBlockType) {
				    case blocktypes[0]:
				        squares++
				        break;
				    case blocktypes[1]:
				        hstsTL++;
						hsts++;
				        break;
				    case blocktypes[2]:
				        hstsTR++;
						hsts++;
				        break;
				    case blocktypes[3]:
				        hstsBL++;
						hsts++;
				        break;
				    case blocktypes[4]:
				        hstsBR++;
						hsts++;
				        break;
				}
				newBlockType(a,b);
				a += blockWidth;
			}
			a = 0;
			b += blockWidth;
		}

		// add a border
		canvas.className = 'border';

		// update square and HST count on page
		squareCount.textContent = squares;
		hstCount.textContent = hsts;
		hstTL.textContent = hstsTL;
		hstTR.textContent = hstsTR;
		hstBL.textContent = hstsBL;
		hstBR.textContent = hstsBR;


		// determine yardage

		// var yardage = function(cutSize, blockCount) {

		// 	// calculate maximum # of blocks per strip
		// 	var blocksPerStrip = Math.floor(40 / cutSize);

		// 	// calculate minimum # of strips needed
		// 	var strips = Math.ceil(blockCount / blocksPerStrip);

		// 	// determine fabric yardage, based on # of strips
		// 	var stripsPerYard = (strips * cutSize) / 36;
		// 	return(Math.ceil(stripsPerYard * 4) / 4).toFixed(2);
		// }

		// // unfinished cut blocksize for squares = size + 0.5"
		// var ydSquares = yardage((blockSize + 0.5), squares);

		// // unfinished cut blocksize for HSTs = size + 0.875"
		// var ydFabricB = yardage((blockSize + 0.875), (hsts / 2));

		// var ydFabricA = Number(ydSquares) + Number(ydFabricB);

		// fabricA.textContent = ydFabricA + ' yards';
		// fabricB.textContent = ydFabricB + ' yards';


		var yardage = function(cutSize, blockCount) {

			// round up blockCount to nearest whole number
			blockCount = Math.ceil(blockCount);
			
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
		// one cut block makes 2 HSTs
		var ydFabricA = yardage((blockSize + 0.875), (hsts / 2));

		var ydFabricC = yardage((blockSize + 0.875), (hstsTL / 2));

		var ydFabricD = yardage((blockSize + 0.875), (hstsTR / 2));

		var ydFabricE = yardage((blockSize + 0.875), (hstsBL / 2));

		var ydFabricF = yardage((blockSize + 0.875), (hstsBR / 2));


		fabricA.textContent = 'Fabric A (background): ' + ydFabricA + ' yards';
		fabricB.textContent = 'Fabric B (squares): ' + ydSquares + ' yards';
		fabricC.textContent = 'Fabric C (top left triangles): ' + ydFabricC + ' yards';
		fabricD.textContent = 'Fabric D (top right triangles): ' + ydFabricD + ' yards';
		fabricE.textContent = 'Fabric E (bottom left triangles): ' + ydFabricE + ' yards';
		fabricF.textContent = 'Fabric F (bottom right triangles): ' + ydFabricF + ' yards';
	}

}

// set up some functions

function validate(field) {
	var userEntry = document.getElementById(field).value;
	if (userEntry == null || userEntry == '') {
		entry = document.getElementById(field);
		entry.className = 'warning';
		alertmsg = document.createElement('p');
		alertmsg.className = 'alertmsg';
        alertmsg.innerHTML = 'This field is required.';
        entry.parentNode.insertBefore(alertmsg, entry.nextSibling);
        return false;
	} else {
		return true;
	}
}

function square(a,b) {
	ctx.fillStyle = scheme[0];
	ctx.fillRect(a,b,blockWidth,blockWidth);
}

function hstTopLeft(a,b) {
	var path = new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockWidth,b);
    path.lineTo(a,b + blockWidth);
    ctx.fillStyle = scheme[1];
    ctx.fill(path);
}

function hstTopRight(a,b) {
	var path = new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockWidth, b);
    path.lineTo(a + blockWidth,b + blockWidth);
    ctx.fillStyle = scheme[2];
    ctx.fill(path);
}

function hstBottomLeft(a,b) {
	var path = new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockWidth,b + blockWidth);
    path.lineTo(a, b + blockWidth);
    ctx.fillStyle = scheme[3];
    ctx.fill(path);
}

function hstBottomRight(a,b) {
	var path = new Path2D();
    path.moveTo(a + blockWidth,b);
    path.lineTo(a + blockWidth,b + blockWidth);
    path.lineTo(a, b + blockWidth);
    ctx.fillStyle = scheme[4];
    ctx.fill(path);
}







