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

