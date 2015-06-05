// via http://stackoverflow.com/questions/11730917/apply-a-random-class-to-an-element (using jquery)

$(document).ready(function () {

    // set block types
    var blocks = ['square', 'hst-topleft', 'hst-topright', 'hst-bottomleft', 'hst-bottomright'];

    // select all spans
    var squares = $('span');

    // loop through all spans and apply block type randomly
    $.each(squares, function(key, value) {
        // get random value/class-name from array and add it using the addClass function
        $(value).addClass(blocks[Math.floor(Math.random() * blocks.length)]);
    });

});

// set up some global variables
var blockWidth = 60;
var blockHeight = 60;
var rows;
var columns;
var squares = 0;
var hsts = 0;

// array for block classes
var blocks = ['square', 'hst-topleft', 'hst-topright', 'hst-bottomleft', 'hst-bottomright'];

// locate some DOM elements
var squareCount = document.getElementById('squares');
var hstCount = document.getElementById('hsts')
var quilt = document.getElementById('quilt');
var submit = document.getElementById('submit');

// fill quilt canvas with blocks
submit.onclick = function(event) {
	event.preventDefault();
	// remove any old content and reset square/HST count
	quilt.innerHTML = "";
	squares = 0;
	hsts = 0;
	// grab row and column #s from form
	rows = document.getElementById('rows').value;
	columns = document.getElementById('columns').value;

	// set quilt div width for border
	quiltWidth = columns * blockWidth;

	// loop through rows and columns, adding blocks
	for (i = 0; i < rows; i++) {
		var newRow = document.createElement('div');
		newRow.className = 'row';
		for (j = 0; j < columns; j++) {
			var newBlock = document.createElement('span');
			// apply random class to block
			var newClass = blocks[Math.floor(Math.random() * blocks.length)];
			// increase block counts based on class
			if (newClass === blocks[0]) {
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

	// update square and HST count
	squareCount.textContent += squares;
	hstCount.textContent += hsts;
}




