import riot from 'riot';
import componentFactory from '../component-factory';

import miscUtil from '../util/misc';
import gfxUtil from '../util/gfx';


import Eye from '../objects/eye';

componentFactory.createComponent('face', `

 <style>
     face {
     }
 </style>
 `,
 function(opts) {

    this.WIDTH = 1280;
    this.HEIGHT = 720;

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
        this.eye1 = new Eye();
        this.eye1.sprite.position.x = 100;
        this.eye1.sprite.position.y = 100;
        this.stage.addChild(this.eye1.sprite);
        this.eye2 = new Eye();
        this.eye2.sprite.position.x = this.WIDTH - 100;
        this.eye2.sprite.position.y = 100;
        this.stage.addChild(this.eye2.sprite);
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
             this.stage.addChild(gfxUtil.rectangle(0, 0, this.WIDTH, this.HEIGHT, 0x52FFBF, 0x000000, 0));
             let loader = PIXI.loader;
             loader.add('eye', "assets/eye.png");

             loader.once('complete', () => {
                console.log("Assets loaded!");
                this.addEyes();
                this.draw();
             });
             loader.load();
         }
     });
});


