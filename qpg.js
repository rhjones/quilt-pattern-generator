// via http://stackoverflow.com/questions/11730917/apply-a-random-class-to-an-element (using jquery)

$(document).ready(function () {

    // set block types
    var blocktypes = ['square', 'hst-topleft', 'hst-topright', 'hst-bottomleft', 'hst-bottomright'];

    // select all spans
    var squares = $('span');

    // loop through all spans and apply block type randomly
    $.each(squares, function(key, value) {
        // get random value/class-name from array and add it using the addClass function
        $(value).addClass(blocktypes[Math.floor(Math.random() * blocktypes.length)]);
    });

});

// set up some global variables
var blockWidth = 60;
var blockHeight = 60;
var rows;
var columns;
var squares;
var hsts;
var blocksize;

// array for block classes
var blocktypes = ['square', 'hst-topleft', 'hst-topright', 'hst-bottomleft', 'hst-bottomright'];

// locate some DOM elements
var submit = document.getElementById('submit');
var squareCount = document.getElementById('squares');
var hstCount = document.getElementById('hsts')
var fabricA = document.getElementById('fabricA');
var fabricB = document.getElementById('fabricB');
var quilt = document.getElementById('quilt');


// fill quilt canvas with blocks
submit.onclick = function(event) {
	event.preventDefault();
	// remove any old content and reset square/HST count and block size
	quilt.innerHTML = "";
	squares = 0;
	hsts = 0;

	// grab data from form
	rows = document.getElementById('rows').value;
	columns = document.getElementById('columns').value;
	blocksize = Number(document.getElementById('blocksize').value);

	// set quilt div width for border
	quiltWidth = columns * blockWidth;

	// loop through rows and columns, adding blocks
	for (i = 0; i < rows; i++) {
		var newRow = document.createElement('div');
		newRow.className = 'row';
		for (j = 0; j < columns; j++) {
			var newBlock = document.createElement('span');
			// apply random class to block
			var newClass = blocktypes[Math.floor(Math.random() * blocktypes.length)];
			// increase block counts based on class
			if (newClass === blocktypes[0]) {
				squares++;
			} else {
				hsts++;
			}
			newBlock.className = newClass;
			newRow.appendChild(newBlock);
		}
		quilt.appendChild(newRow);
	}

	// set quilt width and apply border
	quilt.style.width = quiltWidth + 'px';
	quilt.className = 'border';

	// update square and HST count on page
	squareCount.textContent = 'Squares: ' + squares;
	hstCount.textContent = 'Half Square Triangles: ' + hsts;

	// determine yardage

	var yardage = function(blocksize, blockcount) {

		// calculate maximum # of blocks per strip
		var blocksPerStrip = Math.floor(40 / blocksize);

		// calculate minimum # of strips needed
		var strips = Math.ceil(blockcount / blocksPerStrip);

		// determine fabric yardage, based on # of strips
		var stripsPerYard = (strips * blocksize) / 36;
		return(Math.ceil(stripsPerYard * 4) / 4).toFixed(2);
	}

	// unfinished cut size for squares = size + 0.5"
	var yardageforSquares = yardage((blocksize + 0.5), squares);

	// unfinished cut size for HSTs = size + 0.857"
	var yardageforHSTs = yardage((blocksize + 0.875), hsts);

	var ydFabricB = yardageforHSTs / 2;
	var ydFabricA = Number(yardageforSquares) + Number(ydFabricB);
	

	fabricA.textContent = 'Fabric A: ' + ydFabricA + ' yards';
	fabricB.textContent = 'Fabric B: ' + ydFabricB + ' yards';
	
}




