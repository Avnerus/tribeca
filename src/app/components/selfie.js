import riot from 'riot';
import componentFactory from '../component-factory';
import miscUtil from '../util/misc'

componentFactory.createComponent('selfie', `

 <div id="poleroid">
 </div>
 <div id="result"></div>
 <div id="camera"></div>


 <style>
     selfie #camera {
         width: 755px ;
         height: 687px;
         position: fixed;
         left: 99999px;
     }
     selfie #result {
         width: 755px;
         height: 687px;
         position: fixed;
         left: 50%;
         transform: translate(-50%);
         z-index: 1;
         top: 110px;
     }
     selfie #poleroid {
         background-image: url("/assets/poleroid.png");
         position: fixed;
         left: 50%;
         transform: translate(-50%);
         width: 862px;
         height: 951px;
         z-index: 2;
         top: 30px;
         display: none;
     }
 </style>
 `,
 function(opts) {
     console.log("Init selfie tag");
     var self = this;
     this.snap = function() {
         Webcam.snap( function(data_uri) {
             console.log(data_uri);
             document.getElementById('result').innerHTML = '<img src="'+data_uri+'"/>';
             $(self.root).find('#poleroid').show(); 
             Webcam.on( 'uploadProgress', function(progress) {
                console.log("Upload progress: ", progress); 
             });

             Webcam.on( 'uploadComplete', function(code, text) {
                 console.log("Upload complete!", code, text);
             });
             Webcam.upload(data_uri, '/upload');
         });
     }
     this.clear = function() {
         $(self.root).find('#poleroid').hide();
         document.getElementById('result').innerHTML = '';
     }

     this.on('mount', () => {
         if (miscUtil.isBrowser()) {
            Webcam.attach('#camera');
         }
     });
});


