// set up some global variables
var blockWidth = 60;
var blockHeight = 60;
var rows;
var columns;
var squares;
var hsts;
var blockSize;

// array for block classes
var blockTypes = ['square', 'hst-topleft', 'hst-topright', 'hst-bottomleft', 'hst-bottomright'];

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
	blockSize = Number(document.getElementById('blocksize').value);

	// validate
	if (rows == null || rows == '') {
        rowInput = document.getElementById('rows');
        rowInput.className = 'warning';
        alertmsg = document.createElement('p');
        alertmsg.innerHTML = 'This field is required.';
        alertmsg.id = 'alertmsg'
        rowInput.parentNode.insertBefore(alertmsg, rowInput.nextSibling);
        return false;
    } else if (columns == null || columns == '') {
    	return false;
    } else if (blockSize == null || blockSize == '') {
    	return false;
    }
	// set quilt div width for border
	quiltWidth = columns * blockWidth;

	// loop through rows and columns, adding blocks
	for (i = 0; i < rows; i++) {
		var newRow = document.createElement('div');
		newRow.className = 'row';
		for (j = 0; j < columns; j++) {
			var newBlock = document.createElement('span');
			// apply random class to block
			var newClass = blockTypes[Math.floor(Math.random() * blockTypes.length)];
			// increase block counts based on class
			if (newClass === blockTypes[0]) {
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

	fabricA.textContent = 'Fabric A: ' + ydFabricA + ' yards';
	fabricB.textContent = 'Fabric B: ' + ydFabricB + ' yards';
	
}




