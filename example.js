var
	colStr = require('./index.js');

var
	rows = 24,
	str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

for (var y = 0; y < rows; y++) {
	for (var x = 0; x < str.length; x++) {
		var r = Math.round((x / (str.length - 1)) * 255);
		var g = Math.round((y / (rows - 1)) * 255);
		var b = (255 - Math.round(((x + y) / ((rows + str.length) - 2)) * 255));
		process.stdout.write(colStr('{rgb(' + r + ', ' + g + ', ' + b + ')}' + str.substr(x, 1)));
	}
	process.stdout.write("\n");
}

