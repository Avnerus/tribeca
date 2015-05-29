import riot from 'riot';
import componentFactory from '../component-factory';

import miscUtil from '../util/misc';
import gfxUtil from '../util/gfx';


import Eye from '../objects/eye';
import BGAnim from '../objects/bganim';

import text from './text';
import inputarea from './inputarea';
import selfie from './selfie';

import Logic from '../model/logic'

componentFactory.createComponent('face', `

 <selfie></selfie>
 <text></text>
 <inputarea></inputarea>

 <style>
     face {
     }
 </style>
 `,
 function(opts) {
    var self = this; 

    function draw() {
        if (!self || !self.renderer) {
            return;
        }
       self.renderer.render(self.stage);
       requestAnimationFrame(draw);
    }

    this.WIDTH = 1920;
    this.HEIGHT = 1080;

     if (miscUtil.isBrowser()) {
         window.PIXI = require('pixi.js');
         window.GSAP = require('gsap');
     }


     this.addEyes = function() {
        console.log("Adding eyes");
        this.eyes = new Eye();
        this.eyes.sprite.position.x = this.WIDTH / 2;
        this.eyes.sprite.position.y = 150;
        this.stage.addChild(this.eyes.sprite);


         // Change mood every 10 seconds
         setInterval(() => {
             this.eyes.randomMood();
         },10000);
        // Blink every 3 seconds
        setInterval(() => {
            this.eyes.blink();
        },3000);

     }

     this.initSpeak = function() {
        meSpeak.loadConfig("/assets/mespeak/mespeak_config.json");
        meSpeak.loadVoice("/assets/mespeak/voices/en/en-us.json");
//        meSpeak.loadVoice("/assets/mespeak/voices/fr.json");
     }
     this.on('mount', () => {
         if (miscUtil.isBrowser()) {
             console.log("Init PIXI.JS");
             // Init PIXI
             this.renderer = new PIXI.autoDetectRenderer(this.WIDTH, this.HEIGHT);

             this.renderer.view.style.width = window.innerWidth + "px";
             this.renderer.view.style.height = window.innerHeight + "px";
             this.root.appendChild(this.renderer.view);
             this.stage = new PIXI.Container();
             console.log("Stage: ", this.stage);
             // Color BG
             // this.stage.addChild(gfxUtil.rectangle(0, 0, this.WIDTH, this.HEIGHT, 0x52FFBF, 0x000000, 0));
             let loader = PIXI.loader;

             // Background frames
             loader.add('bg01', "assets/bg01.png");
             loader.add('bg02', "assets/bg02.png");
             loader.add('bg03', "assets/bg03.png");
             loader.add('bg04', "assets/bg04.png");
             loader.add('bg05', "assets/bg05.png");
             loader.add('bg06', "assets/bg06.png");


             loader.once('complete', () => {
                console.log("Assets loaded!");
                // Picture BG
                let bgAnim = new BGAnim();
                bgAnim.init();
                this.stage.addChild(bgAnim.clip);
                //   this.addEyes();
                this.initSpeak();

                // Init logic
                this.logic = new Logic();
                this.logic.init(this.tags['inputarea'], this.tags['text'], this.tags['selfie']);

                draw();
             });
             loader.load();
         }
     });
});


