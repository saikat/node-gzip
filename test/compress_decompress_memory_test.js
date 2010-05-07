var compress = require('../build/default/compress');
var sys = require('sys')
var fs = require('fs')
var gzip = new compress.Gzip;
var gunzip = new compress.Gunzip;

// Check your memory usage for the node process while running this test!
var data = fs.readFileSync('files/testfile', 'binary')
for (var i = 0; i < 1000; i++)
{
    gzip.init();
    var val = gzip.deflate(data, 'binary');
    var val1 =  gzip.end();
    gunzip.init();
    var decompressed = gunzip.inflate(val+val1) + gunzip.end();
    if (decompressed !== data)
	throw "Error";
    
}
sys.puts("Test succeeded!");

