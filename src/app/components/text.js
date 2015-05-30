import riot from 'riot';
import componentFactory from '../component-factory';
import miscUtil from '../util/misc';
import mathUtil from '../util/math';

componentFactory.createComponent('text', `

 <h1>{currentMessage}</h1>

 <style>
     text {
         font-family: akashi;
         position: fixed;
         margin-top: 0px;
         left: 50%;
         transform: translate(-50%);
         font-size: 32;
         text-shadow: 4px 4px 4px #000000;
         color: white;
     }
 </style>
 `,
 function(opts) {
     this.currentMessage = "";
     this.say = (lines, onComplete, histerical) => {
         this.remainingLines = lines.slice(0);
         let self = this;
         function sayLine() {

             self.currentMessage = self.remainingLines[0];
             self.update();

             let options = {};
             let speakLine;
             speakLine = self.currentMessage;

             if (!histerical) {
                 options.pitch = 100;
                 options.speed = 175;
                 options.amplitude = 100;
                 options.variant = "m6";
             } else {
                 options.pitch = mathUtil.getRandomInt(60, 120);
                 options.speed = 20;
                 options.amplitude = 200;
                 options.variant = "croak";
             }


             if (self.remainingLines.length > 1) {
                 self.remainingLines = self.remainingLines.slice(1);
                 meSpeak.speak(speakLine,options,sayLine);//{voice: "en/en-us", variant: "m6", pitch: 100, speed: 175, amplitude: 200}
             } else {
                 console.log("Running", onComplete);
                 meSpeak.speak(speakLine,options,onComplete);
             }
         }
         sayLine();
     }
 });


