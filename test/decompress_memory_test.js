var compress = require('../build/default/compress');
var sys = require('sys')
var fs = require('fs')
var gunzip = new compress.Gunzip;
var unzippedValue = fs.readFileSync('files/testfile', 'binary');
var data = fs.readFileSync('files/testfile.gz', 'binary');

// Check your memory usage for the node process while running this test!
for (var i = 0; i < 10000; i++)
{
    gunzip.init();
    var val = gunzip.inflate(data) + gunzip.end();
    if (val  !== unzippedValue)
	throw "Unzipped value was not correct";
}

sys.puts("Test succeeded!");
	