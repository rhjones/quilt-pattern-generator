# Quilt Pattern Generator

Playing around with writing JavaScript that will generate a random quilt pattern that uses half square triangles and squares. 

Initially working with two colors; may eventually add multiple colors.

May also add additional kinds of quilt blocks/shapes.

## TODO
- color
	- make palette switcher buttons work
	- multiple color schemes
	- random color schemes
	- apply your own color scheme
- save (and share?) patterns
- generate random set of blocks, then repeat pattern as larger block
- handling a larger range of block sizes (perhaps user-entered?)
- include cutting and piecing instructions
- review variable scope
- clean up JS
- style
	- alert messages
	- form
	- yardage calculation
	- how to use this site
	- cutting and piecing instructions
- copy
	- FAQ
	- instructions for use
	- about
- maybe someday rewrite [this](http://www.levitated.net/daily/lev9block.html) in JavaScript, for fun

## COMPLETE
- 	color
	- polychrome (more than two fabrics)
	- random color for fabric A
- fix issue with proportionality of blocks
- switch to using canvas instead of a bunch of spans
	- draw quilt blocks on canvas
		- figure out how to create different block types
	- resize canvas & quilt diagram with window resize
- switch to standard quilt sizes + compatible block sizes
- way to change quilt size
- count (and display) # of HST and square blocks needed
- calcuate necessary yardage
  - figure out necessary math
- fix HST yardage calculation (divide yardage in the middle of the process, then round up)
- validate form entries
	- row needs to be a #
	- column needs to be a #
	- (for now) blocksize needs to be *something*
- apply warning styling to form fields when they fail validation
- add alert message to form fields when they validation

# LICENSE

The MIT License (MIT)

Copyright © 2015 Rebekah Heacock Jones

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

