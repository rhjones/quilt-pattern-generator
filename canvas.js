//Get the canvas & context
var canvas = document.getElementById('quiltcanvas');
var ctx = canvas.getContext('2d');
var container = canvas.parentNode;
console.log(container);
var containerw = container.offsetWidth;
console.log('container width: ' + containerw);

var x = canvas.width;
var y = canvas.height;
console.log('width: ' + x);
console.log('height: ' + y);

var rows = 4;
var columns = 4;

var blockwidth = x / columns;
var a = 0;
var b = 0;
var c = blockwidth;
var d = blockwidth;

ctx.fillStyle = 'rgba(110, 152, 121, 1)';

function square(a,b,c,d) {
	ctx.fillRect(a,b,c,d);
}

function hstTopLeft(a,b,c,d) {
	var path=new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockwidth,b);
    path.lineTo(a,b + blockwidth);
    ctx.fill(path);
}

function hstTopRight(a,b,c,d) {
	var path=new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockwidth, b);
    path.lineTo(a + blockwidth,b + blockwidth);
    ctx.fill(path);
}

function hstBottomLeft(a,b,c,d) {
	var path=new Path2D();
    path.moveTo(a,b);
    path.lineTo(a + blockwidth,b + blockwidth);
    path.lineTo(a, b + blockwidth);
    ctx.fill(path);
}

function hstBottomRight(a,b,c,d) {
	var path=new Path2D();
    path.moveTo(a + blockwidth,b);
    path.lineTo(a + blockwidth,b + blockwidth);
    path.lineTo(a, b + blockwidth);
    ctx.fill(path);
}

var blocktype = [square, hstTopLeft, hstTopRight, hstBottomLeft, hstBottomRight];

for (i = 0; i < rows; i++) {
	for (j = 0; j < columns; j++) {
		blocktype[Math.floor(Math.random() * blocktype.length)](a,b,c,d);
		console.log('a: ' + a + ', b: ' + b + ', c: ' + c + ', d: '+ d);
		a += blockwidth;
		c += blockwidth;
	}
	a = 0;
	c = blockwidth;
	b += blockwidth;
	d += blockwidth;
}
