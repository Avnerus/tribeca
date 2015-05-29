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
         z-index: 3;
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

     this.hide = function() {
         $(this.input).hide();
     }

     this.show = function() {
         this.input.value = "";
         $(this.input).show();
     }

     this.send = function() {
        
         console.log("Send message! ", this.input.value);
         if (this.onSend) {
             this.onSend(this.input.value);
         }
     }
});


