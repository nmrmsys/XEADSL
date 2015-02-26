/**
* XEADSL
*/

var program = require('commander');

var fs = require('fs');
var path = require('path');
var converter = require('converter');

var util = require('util');
function dump(v){
    return console.log(util.inspect(v));
}

program
    .version('0.0.1')
    .option('-a, --arg [Your arg]', 'Specify your arg.')
    .parse(process.argv);

files = program.args

if(!files.length) {
    program.help();
} else {

  var options = {
      from: 'xml',
      to: 'yml'
  };
  
  var convert = converter(options);

  for (i = 0; i < files.length; i++) {

    from_file = files[i];
    to_file = from_file.replace(new RegExp(path.extname(from_file)+'$'), '.yaml');

    var reader = fs.createReadStream(from_file);
    var writer = fs.createWriteStream(to_file);

    reader.pipe(convert).pipe(writer);
  }

}
