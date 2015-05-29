import riot from 'riot';
import componentFactory from '../component-factory';
import miscUtil from '../util/misc';

componentFactory.createComponent('text', `

 <h1>{currentMessage}</h1>

 <style>
     text {
         position: fixed;
         margin-top: 0px;
         left: 50%;
         transform: translate(-50%);
         font-size: 48px;
     }
 </style>
 `,
 function(opts) {
     this.currentMessage = "";
     this.say = (lines, onComplete) => {
         this.remainingLines = lines.slice(0);
         let self = this;
         function sayLine() {
             self.currentMessage = self.remainingLines[0];
             meSpeak.speak(self.currentMessage); //{voice: "en/en-us", variant: "m3", pitch: 35, speed: 160}
             self.update();
             if (self.remainingLines.length > 1) {
                 self.remainingLines = self.remainingLines.slice(1);
                 setTimeout(sayLine, 2000);
             } else {
                 console.log("Running", onComplete);
                 setTimeout(onComplete, 1000);
             }
         }
         sayLine();
     }
 });


