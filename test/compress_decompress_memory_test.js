var compress=require("../lib/gzip");
var sys = require('sys');
var fs = require('fs');
var gzip = new compress.Gzip;
var gunzip = new compress.Gunzip;

// Check your memory usage for the node process while running this test!
var data = fs.readFileSync('files/testfile', 'binary')
for (var i = 0; i < 1000; i++)
{
    if (!(i % 10))
	console.log("Finished " + i);

    gzip.init();
    var val = gzip.deflate(data, 'binary');
    var val1 =  gzip.end();
    gunzip.init();
    var decompressed = gunzip.inflate(val+val1) + gunzip.end();
    if (decompressed !== data)
	throw "Error";
    
}

console.log("Waiting 10 seconds for GC to collect any extra garbage...");
setTimeout(function() {
    console.log("Memory usage should be back to normal now!");
    setTimeout(function() {
    }, 5000);
}, 10000)

