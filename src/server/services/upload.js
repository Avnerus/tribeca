import formidable from 'formidable'
import util from 'util'
import fs from 'fs';
import Q from 'q';

export default function(req, res) {
    console.log("Upload service!");
    let form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      console.log("Files ", files);
      res.end(util.inspect({fields: fields, files: files}));
      // Write the file
      let name = 'selfies/' + Date.now() + '.jpg';
      Q.denodeify(fs.readFile)(files.webcam.path)
      .then(function(data) {
        return Q.denodeify(fs.writeFile)(name, data)
      })
      .then(function() {
        console.log('It\'s saved! - ' + name);
      })
      .catch(function(err) {
          console.log("Error saving file");
      });
    });

    return;   
}
