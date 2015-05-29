'use strict'
import GameObject from './game-object';
import mathUtil from '../util/math'

export default class EyeCam extends GameObject {
    constructor() {
        super();
    }
    init() {
        console.log("Initialising EyeCam");
        let texture = PIXI.Texture.fromFrame("assets/eyecam.png");
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;


        // Rotate
        TweenMax.to(this.sprite , 3, {ease: Linear.easeNone, repeat: -1, rotation: mathUtil.toRadians(360)});
    }

};
