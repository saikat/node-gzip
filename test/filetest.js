var compress=require("../lib/gzip");
var sys=require("sys");
var fs=require("fs");

// Read in our test file
var data=fs.readFileSync("filetest.js", encoding="binary");
sys.puts("Got : "+data.length);

// Set output file
var fd = fs.openSync("filetest.js.gz", process.O_WRONLY | process.O_TRUNC | process.O_CREAT, 0644);
sys.puts("Openned file");

// Create gzip stream
var gzip=new compress.Gzip;
gzip.init();

// Pump data to be compressed
gzdata=gzip.deflate(data, "binary");  // Do this as many times as required
sys.puts("Compressed size : "+gzdata.length);
fs.writeSync(fd, gzdata, encoding="binary");

// Get the last bit
gzlast=gzip.end();
sys.puts("Last bit : "+gzlast.length);
fs.writeSync(fd, gzlast, encoding="binary");
fs.closeSync(fd);
sys.puts("File closed");

// See if we can uncompress it ok
var gunzip=new compress.Gunzip;
gunzip.init();
var testdata = fs.readFileSync("filetest.js.gz", encoding="binary");
sys.puts("Test opened : "+testdata.length);
sys.puts(gunzip.inflate(testdata, "binary").length);
gunzip.end();






