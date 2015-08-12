// set up some global variables
var dimensions = {
	lap: [36, 36],
	twin: [66, 96],
	full: [84, 96],
	queen: [90, 96],
	king: [102, 96]
}

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
	
	// remove previous quilt design
	quilt.innerHTML = "";
	
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


	// validate

	var validate = function(field) {
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
	};

	var valQuiltSize = validate('quiltsize');
	var valBlockSize = validate('blocksize');

	if (valQuiltSize === false || valBlockSize === false) {
		return false;
	} else {
		
		// get data from form
		var quiltSize = document.getElementById('quiltsize').value;
		var blockSize = Number(document.getElementById('blocksize').value);

		// determine desired dimensions
		var wid = dimensions[quiltSize][0];
		var len = dimensions[quiltSize][1];

		// determine number of rows and columns based on quilt and block size
		var columns = wid / blockSize;
		var rows = len / blockSize;

		var blockWidth = 60;
		var blockHeight = 60;


		// set quilt div width for border
		var quiltWidth = columns * blockWidth;

		// loop through rows and columns, adding blocks
		for (i = 0; i < rows; i++) {
			var newRow = document.createElement('div');
			newRow.className = 'quiltrow';
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
		
} // end of submit




