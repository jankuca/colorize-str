colorize-str
============

This node.js module lets you use html/css style color codes for your console/terminal output.

colorizeStr will use the closest terminal/console color. (Use a 256 color xterm terminal for best result.)


Install
-------

Use npm:

	npm install colorize-str


Foreground
----------

Use standard html/css color codes within curly brackets to set forground color:

	var colorizeStr = require('colorize-str');

	console.log(colorizeStr('{#0f0}SUCCESS: {#fff}yay!'));

You can use any of those standard html/css formats:

	'{#fff}i am white'
	'{#ff0000}i am red'
	'{rgb(0, 0, 255)}i am blue'


Background
----------

To use a background color, just separate with semicolon:

	'{#fff;#000}i am white on black'
	'{#ff0000;#00ff00}i am red on green'
	'{rgb(0, 0, 255);rgb(0, 0, 32)}i am bright blue on dark blue'


Gradients
---------

Gradient in terminal is SO COOL!

Set two colors in a string. Prepend the second color code with > to make a gradient of what is in between:

	'{#fff}This is a gradient from white to dark blue{>#004}.'
	'{#fff;#000}Background gradient FTW{#fff;>#ccc}.'

And of course, you can set more than one color in your gradient:

	'{#fff}From white to dark gray{>#333} and then to red.{>#f00}.'

