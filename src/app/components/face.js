import riot from 'riot';
import componentFactory from '../component-factory';

import miscUtil from '../util/misc';
import gfxUtil from '../util/gfx';

import EyeCam from '../objects/eyecam';
import BGAnim from '../objects/bganim';

import text from './text';
import inputarea from './inputarea';
import selfie from './selfie';
import yesno from './yesno';

import Logic from '../model/logic'
import Timer from '../model/timer'

componentFactory.createComponent('face', `

 <selfie></selfie>
 <text></text>
 <inputarea></inputarea>
 <yesno></yesno>

 <style>
     face {
     }
 </style>
 `,
 function(opts) {
    let self = this; 
    let time = 0;

    function draw() {
        if (!self || !self.renderer) {
            return;
        }
       let now = new Date().getTime();
       let dt = now - (time || now);
       self.timer.update(dt);
       self.renderer.render(self.stage);
       time = now;
       requestAnimationFrame(draw);
    }

    function doFullScreen() {
        console.log("Going full screen!")
        var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !==     null) ||    // alternative standard method  
                (document.mozFullScreen || document.webkitIsFullScreen);

        var docElm = document.documentElement;
        if (!isInFullScreen) {

            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            }
            else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            }
            else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            }
        }
    }

    this.WIDTH = 1920;
    this.HEIGHT = 1080;

     if (miscUtil.isBrowser()) {
         window.PIXI = require('pixi.js');
         window.GSAP = require('gsap');
     }


     this.addEye = function() {
        console.log("Adding eyes");
        this.eyecam = new EyeCam();
        this.eyecam.init();
        this.eyecam.sprite.position.x = this.WIDTH / 2;
        this.eyecam.sprite.position.y = this.HEIGHT / 2;
        this.stage.addChild(this.eyecam.sprite);
     }

     this.initSpeak = function() {
        meSpeak.loadConfig("/assets/mespeak/mespeak_config.json");
        meSpeak.loadVoice("/assets/mespeak/voices/en/en.json");
//        meSpeak.loadVoice("/assets/mespeak/voices/fr.json");
     }
     this.on('mount', () => {
         var self = this;
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


             // Crazy assets
             let crazyAssets = ['brain', 'cake', 'crazyeye', 'egg', 'gun', 'heart1', 'heart2', 'heart3', 'piramid','sord', 'spider', 'tear', 'rain1', 'rain2'];


             loader.add('bg01', "assets/bg01.png");
             loader.add('bg01', "assets/bg01.png");
             loader.add('bg01', "assets/bg01.png");
             loader.add('bg01', "assets/bg01.png");
             loader.add('bg01', "assets/bg01.png");
             loader.add('bg01', "assets/bg01.png");
             loader.add('bg01', "assets/bg01.png");

             // Eye
             loader.add('eyecam', "assets/eyecam.png");



             window.onresize = function() {
                console.log("Window resize!");
                self.renderer.view.style.width = window.innerWidth + "px";
                self.renderer.view.style.height = window.innerHeight + "px";
             }
             // TAB KEY FULLSCREEN
             document.addEventListener("keydown", function(e) {
              if (e.keyCode == 9) {
                  console.log("Tab pressed!!");
                doFullScreen();
              }
             }, false);

             loader.once('complete', () => {
                console.log("Assets loaded!");
                // Picture BG
                let bgAnim = new BGAnim();
                bgAnim.init();
                this.stage.addChild(bgAnim.clip);
                this.addEye();
                this.initSpeak();

                // Init timer
                console.log("Trying to init timer");
                this.timer = new Timer();
                this.timer.init();               

                // Init logic
                this.logic = new Logic();
                this.logic.init(
                    this.tags['inputarea'], 
                    this.tags['text'], 
                    this.tags['selfie'], 
                    this.tags['yesno'],
                    this.timer
                );


                draw();
             });
             loader.load();
         }
     });
});


