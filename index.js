var
	clc = require('cli-color'),
	colorString = require('color-string'),
	xtermColors = require('./xtermcolors')
	;

function findClosest(color) {
	if (color === null) return null;
	var diff = new Array(257).join('0').split('');

	for (var i = 0; i < 3; i++) {
		for (var ii = 0; ii < 256; ii++) {
			diff[ii] = parseInt(diff[ii]) + Math.abs(xtermColors[ii][i] - color[i]);
		}
	}
	var lowestDiff = 255 + 255 + 255;
	var bestMatch = -1;
	for (var i = 0; i < 256; i++) {
		if (diff[i] < lowestDiff) {
			lowestDiff = diff[i];
			bestMatch = i;
		}
	}
	return bestMatch;
}

function colorize(str, color, bgcolor) {
	var color = findClosest(color);
	var bgcolor = findClosest(bgcolor);
	if (color === null) {
		if (bgcolor === null) return str;
		return clc.xterm(bgcolor)(str);
	} else {
		if (bgcolor === null) {
			return clc.xterm(color)(str);
		} else {
			return clc.xterm(color).bgXterm(bgcolor)(str);
		}
	}
}

module.exports = function(str) {

	var color = null;
	var bgcolor = null;
	var result = '';
	while (m = str.match(/\{([^\{\}]*)\}/)) {
		str = str.split(m[0], 2);
		result += colorize(str[0], color, bgcolor);
		if (m[1].indexOf(';') === -1) {
			color = colorString.getRgb(m[1]);
			bgcolor = null;
		} else {
			var strsplit = m[1].split(';', 2);
			color = colorString.getRgb(strsplit[0]);
			bgcolor = colorString.getRgb(strsplit[1]);
		}
		str = str[1];
	}
	result += colorize(str, color, bgcolor);
	return result;
};

