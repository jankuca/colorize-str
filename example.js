var
	colStr = require('./index.js');

var
	rows = 24,
	str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

for (var y = 0; y < rows; y++) {
	for (var x = 0; x < str.length; x++) {
		process.stdout.write(colStr('{rgb(' + Math.round((x / (str.length - 1)) * 255) + ', ' + Math.round((y / (rows - 1)) * 255) + ', ' + (255 - Math.round(((x + y) / ((rows + str.length) - 2)) * 255)) + ')}' + str.substr(x, 1)));
	}
	process.stdout.write("\n");
}

