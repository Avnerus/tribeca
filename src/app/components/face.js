import riot from 'riot';
import componentFactory from '../component-factory';

import miscUtil from '../util/misc';
import gfxUtil from '../util/gfx';


import Eye from '../objects/eye';
import text from './text';
import Logic from '../model/logic'

componentFactory.createComponent('face', `

 <text></text>

 <style>
     face {
     }
 </style>
 `,
 function(opts) {

    this.WIDTH = 1920;
    this.HEIGHT = 1080;

     if (miscUtil.isBrowser()) {
         window.PIXI = require('pixi.js');
     }
     this.draw = function() {
         if (!this || !this.renderer) {
             return;
         }
        this.renderer.render(this.stage);
        requestAnimationFrame(this.draw);
     }


     this.addEyes = function() {
        console.log("Adding eyes");
        this.eyes = new Eye();
        this.eyes.sprite.position.x = this.WIDTH / 2;
        this.eyes.sprite.position.y = 100;
        this.stage.addChild(this.eyes.sprite);
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
             loader.add('eye', "assets/eye.png");
             loader.add('eyes', "assets/eyes.png");
             loader.add('blink', "assets/blink.png");

             loader.once('complete', () => {
                console.log("Assets loaded!");
                // Picture BG
                let bg = PIXI.Sprite.fromFrame("assets/bg.jpg");
                this.stage.addChild(bg);
                this.addEyes();

                // Init logic
                this.logic = new Logic();
                this.logic.initWithIO(this.tags['text']);
                this.logic.run();

                this.draw();
             });
             loader.load();
         }
     });
});


