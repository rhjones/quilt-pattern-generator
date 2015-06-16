# Quilt Pattern Generator

Playing around with writing JavaScript that will generate a random quilt pattern that uses half square triangles and squares. 

Initially working with two colors; may eventually add multiple colors.

May also add additional kinds of quilt blocks/shapes.

TODO
- review variable scope
- random color for fabric A
- save (and share?) patterns
- generate random set of blocks, then repeat pattern as larger block
- handling a larger range of block sizes (perhaps user-entered?)
- include cutting and piecing instructions
- style
	- alert messages
	- form
	- yardage calculation
	- how to use this site
	- cutting and piecing instructions
- maybe someday rewrite [this](http://www.levitated.net/daily/lev9block.html) in JavaScript, for fun

COMPLETE
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

