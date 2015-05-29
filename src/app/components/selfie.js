import riot from 'riot';
import componentFactory from '../component-factory';
import miscUtil from '../util/misc'

componentFactory.createComponent('selfie', `

 <div id="result"></div>
 <div id="camera"></div>


 <style>
     selfie #camera {
         width: 400px;
         height: 300px;
         position: fixed;
         left: 99999px;
     }
     selfie #result {
        position: fixed;
        left: 50%;
        transform: translate(-50%);
     }
 </style>
 `,
 function(opts) {
     console.log("Init selfie tag");
     this.snap = function() {
         Webcam.snap( function(data_uri) {
             console.log(data_uri);
             document.getElementById('result').innerHTML = '<img src="'+data_uri+'"/>';
             Webcam.on( 'uploadProgress', function(progress) {
                console.log("Upload progress: ", progress); 
             });

             Webcam.on( 'uploadComplete', function(code, text) {
                 console.log("Upload complete!", code, text);
             });
             Webcam.upload(data_uri, '/upload');
         });
     }

     this.on('mount', () => {
         if (miscUtil.isBrowser()) {
            Webcam.attach('#camera');
         }
     });
});


