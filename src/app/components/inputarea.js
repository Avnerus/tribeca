import riot from 'riot';
import componentFactory from '../component-factory';

componentFactory.createComponent('inputarea', `

 <form onsubmit="{ send }">
    <input class="message-input" name="input">
 </form>


 <style>
     inputarea {
         position: fixed;
         left: 50%;
         transform: translate(-50%);
         bottom: 10%;
     }
     inputarea .message-input   {
         background-color: transparent;
         border-style: solid;
         font-size: 32px;
     }
 </style>
 `,
 function(opts) {

     this.onSend = null;

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

     this.send = function() {
        
         console.log("Send message! ", this.input.value);
         if (this.onSend) {
             this.onSend(this.input.value);
         }
     }
});


