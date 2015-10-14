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
	for (var i = 16; i < 256; i++) {
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

function colorizeGradient(str, color0, bgcolor0, color1, bgcolor1) {
	if (str.length < 2 || (findClosest(color0) == findClosest(color1) && findClosest(bgcolor0) == findClosest(bgcolor1))) return colorize(str, color0, bgcolor0);
	if (color0 !== null && color1 !== null) {
		var rstep = (color0[0] - color1[0]) / str.length;
		var gstep = (color0[1] - color1[1]) / str.length;
		var bstep = (color0[2] - color1[2]) / str.length;
	}
	if (bgcolor0 !== null && bgcolor1 !== null) {
		var bgrstep = (bgcolor0[0] - bgcolor1[0]) / str.length;
		var bggstep = (bgcolor0[1] - bgcolor1[1]) / str.length;
		var bgbstep = (bgcolor0[2] - bgcolor1[2]) / str.length;
	}
	var result = ''
	for (var i = 0; i < str.length; i++) {
		if (typeof (rstep) !== 'undefined') {
			var color = [ Math.round(color0[0] - (rstep * i)), Math.round(color0[1] - (gstep * i)), Math.round(color0[2] - (bstep * i)) ];
		}
		if (typeof (bgrstep) !== 'undefined') {
			var bgcolor = [ Math.round(bgcolor0[0] - (bgrstep * i)), Math.round(bgcolor0[1] - (bggstep * i)), Math.round(bgcolor0[2] - (bgbstep * i)) ];
		}

		if (typeof (color) !== 'undefined') {
			if (typeof (bgcolor) === 'undefined') {
				result += clc.xterm(findClosest(color))(str.substr(i, 1));
			} else {
				result += clc.xterm(findClosest(color)).bgXterm(findClosest(bgcolor))(str.substr(i, 1));
			}
		} else {
			result += clc.bgXterm(findClosest(bgcolor))(str.substr(i, 1));
		}

	}
	return result;
}

module.exports = function(str) {

	var color = null;
	var bgcolor = null;
	var result = '';

	var gradientFg = false;
	var gradientBg = false;

	var m;

	while (m = str.match(/\{((?:#|>|rgb\()[^\{\}]*)\}/)) {

		var prevcolor = color;
		var prevbgcolor = bgcolor;

		str = str.split(m[0], 2);

		gradientFg = false;
		gradientBg = false;

		if (m[1].indexOf(';') === -1) {
			if (m[1].substr(0, 1) === '>') {
				gradientFg = true;
				m[1] = m[1].substr(1);
			}
			color = colorString.getRgb(m[1]);
			bgcolor = null;
		} else {
			var strsplit = m[1].split(';', 2);
			if (strsplit[0].substr(0, 1) === '>') {
				gradientFg = true;
				strsplit[0] = strsplit[0].substr(1);
			}
			if (strsplit[1].substr(0, 1) === '>') {
				gradientBg = true;
				strsplit[1] = strsplit[1].substr(1);
			}
			color = colorString.getRgb(strsplit[0]);
			bgcolor = colorString.getRgb(strsplit[1]);
		}

		if (gradientFg || gradientBg) {
			result += colorizeGradient(str[0], prevcolor, prevbgcolor, color, bgcolor);
		} else {
			result += colorize(str[0], prevcolor, prevbgcolor);
		}

		str = str[1];

	}
	result += colorize(str, color, bgcolor);

	return result;
};

