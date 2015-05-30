import formidable from 'formidable'
import util from 'util'
import fs from 'fs';
import Q from 'q';

export default function(req, res) {
    console.log("Upload service!");
    let form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      let id = Date.now();
      let name = 'selfies/' + id + '.jpg';
      req.session.photoId = id.toString();

      console.log("Files ", files);
      res.end(id.toString());
      // Write the file
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
