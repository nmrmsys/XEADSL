/**
* XEADSL
*/

var program = require('commander');

var fs = require('fs');
var converter = require('converter');

program
    .version('0.0.1')
    .option('-a, --arg [Your arg]', 'Specify your arg.')
    .parse(process.argv);

if(!program.arg) {
    program.help();
} else {
  // get a file stream reader pointing to the csv file to convert 
  var reader = fs.createReadStream('skeleton.xead');
   
  // get a file stream writer pointing to the json file to write to 
  var writer = fs.createWriteStream('XEADSL.yaml');
   
  // setup the options for the data converter 
  var options = {
      from: 'xml',
      to: 'yml'
  };
   
  // get a data converter stream using the given options 
  var convert = converter(options);
   
  // pipe everything to do the conversion 
  reader.pipe(convert).pipe(writer);
}
