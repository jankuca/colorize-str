var x = require('./node_modules/cli-color/lib/_xterm-colors.js');
var colorString = require('color-string');

var r = [];
x.forEach(function(c) {
	r.push(colorString.getRgb('#' + c));
});
console.log('module.exports = ' + JSON.stringify(r) + ';');
