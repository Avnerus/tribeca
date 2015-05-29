import riot from 'riot';
import componentFactory from '../component-factory';

componentFactory.createComponent('inputarea', `

 <textarea>Your text</textarea> 

 <style>
     inputarea {
         position: fixed;
         left: 50%;
         transform: translate(-50%);
         bottom: 10%;
     }
     inputarea > textarea {
         background-color: transparent;
         border-style: none;
         font-size: 20px;
     }
 </style>
 `,
 function(opts) {
     this.currentMessage = "";
     this.say = (lines) => {
         this.remainingLines = lines.slice(0);
         let self = this;
         function sayLine() {
             self.currentMessage = self.remainingLines[0];
             self.update();
             if (self.remainingLines.length > 1) {
                 self.remainingLines = self.remainingLines.slice(1);
                 setTimeout(sayLine, 2000);
             }
         }
         sayLine();
     }
});


