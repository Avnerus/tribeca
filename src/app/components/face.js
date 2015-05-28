import riot from 'riot';
import componentFactory from '../component-factory';

import miscUtil from '../util/misc';
import gfxUtil from '../util/gfx';

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

             this.draw();
         }
     });
});


