'use strict'
import GameObject from './game-object';

export default class BGAnim extends GameObject {
    constructor() {
        super();
        console.log("BGAnim constructed");

    }
    init() {
        console.log("Initialising BGAnim");

        let animSeq = [];
        for (var i = 1; i <= 6; i++) {
            var texture = new PIXI.Texture.fromFrame('assets/bg0' + i + ".png");
            animSeq.push(texture);
        }
        this.clip = new PIXI.MovieClip(animSeq);
        this.clip.loop = true;
        this.clip.visible = true;
        this.clip.animationSpeed = 0.1;
        this.clip.play();

        // A bit of a blur
        this.blurFilter = new PIXI.filters.BlurFilter();
        this.blurFilter.blur = 0.5;
        this.clip.filters = [
           this.blurFilter
        ];
    }

};
