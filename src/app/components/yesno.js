import riot from 'riot';
import componentFactory from '../component-factory';

componentFactory.createComponent('yesno', `

 <div show="{visible}">
     <a id="yes-button" onclick="{answerYes}" class="btn" href=""></a>
     <a id="no-button"  onclick="{answerNo}" class="btn" href=""></a>
 </div>


 <style>
     yesno {
         position: fixed;
         left: 50%;
         transform: translate(-50%);
         bottom: 20px;
         height: 200px;
         z-index: 3;
         width: 100%
     }
     yesno .btn {
        height: 200px;
        position: absolute;
        width: 500px;
     }
     yesno #no-button {
         right: 10px;
         background-image: url("/assets/no.png");
     }
     yesno #yes-button {
        background-image: url("/assets/yes.png");
     }
     yesno #no-button:active {
        right: 10px;
        background-image: url("/assets/no_pressed.png");
     }
     yesno #yes-button:active {
       background-image: url("/assets/yes_pressed.png");
     }
 </style>
 `,
 function(opts) {

     this.onAnswer = null;
     this.visible = false;

     this.hide = function() {
         this.visible = false;
         this.update();
     }

     this.show = function() {
         this.visible = true;
         this.update();
     }

     this.answerYes = function() {
         console.log("Answer yes!");
         if (this.onAnswer) {
             this.onAnswer("YES");
         }
    }

    this.answerNo = function() {
        console.log("Answer No!");
        if (this.onAnswer) {
            this.onAnswer("NO");
        }
    }
});


