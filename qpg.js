// via http://stackoverflow.com/questions/11730917/apply-a-random-class-to-an-element

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

var blockWidth = 60;
var blockHeight = 60;
var rows;
var columns;

var blocks = ['square', 'hst-topleft', 'hst-topright', 'hst-bottomleft', 'hst-bottomright'];

var quilt = document.getElementById('quilt');

var submit = document.getElementById('submit');
submit.onclick = function(event) {
	event.preventDefault();
	quilt.innerHTML = "";
	rows = document.getElementById('rows').value;
	columns = document.getElementById('columns').value;
	quiltWidth = columns * blockWidth;
	for (i = 0; i < rows; i++) {
		var newRow = document.createElement('div');
		newRow.className = 'row';
		for (j = 0; j < columns; j++) {
			var newBlock = document.createElement('span');
			newBlock.className = blocks[Math.floor(Math.random() * blocks.length)];
			newRow.appendChild(newBlock);
		}
		quilt.appendChild(newRow);
		quilt.style.width = quiltWidth + 'px';
		quilt.className = 'border';
	}
}


