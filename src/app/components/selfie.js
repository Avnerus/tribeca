import riot from 'riot';
import componentFactory from '../component-factory';
import miscUtil from '../util/misc'

componentFactory.createComponent('selfie', `

 <div show="{showPolaroid}" id="poleroid">
 </div>
 <div show="{showWanted}" id="wanted">
 </div>
 <div show="{showResult}" id="result"></div>
 <div id="camera"></div>
 <audio name="shutter" src="/assets/shutter.wav"></audio>


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
     }
    selfie #wanted {
        background-image: url("/assets/wanted.png");
        position: fixed;
        left: 50%;
        transform: translate(-50%);
        width: 862px;
        height: 951px;
        z-index: 2;
        top: 30px;
    }
 </style>
 `,
 function(opts) {
     console.log("Init selfie tag");
     this.wanted = false;
     this.showWanted = false;
     this.showResult = false;

     var self = this;
     this.snap = function() {
         self.shutter.play();
         Webcam.snap( function(data_uri) {
             console.log(data_uri);
             document.getElementById('result').innerHTML = '<img src="'+data_uri+'"/>';
             self.showPolaroid = true;
             self.showResult = true;
             self.update();
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
         self.showPolaroid = false;
         self.showResult = false;
         self.update();
     }

     this.startWanted = function() {
         var self = this;
         function hideWanted() {
             console.log("Hide wanted");
             self.showWanted = false;
             self.showResult = false;
             self.update();
             setTimeout(showWanted, 3000);
         }
         function showWanted() {
             if (self.wanted) {
                 console.log("Show wanted");
                 self.showWanted = true;
                 self.showResult = true;
                 self.update();
                 setTimeout(hideWanted, 2000);
             }
         }
         this.wanted = true;
         showWanted();
     }

     this.stopWanted = function() {
         this.wanted = false;
         this.showWanted = false;
         this.showResult = false;
         this.update();
     }

     this.on('mount', () => {
         if (miscUtil.isBrowser()) {
            Webcam.attach('#camera');
         }
     });
});


