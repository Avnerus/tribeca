'use strict'
import GameObject from './game-object';

export default class Eye extends GameObject {
    constructor() {
        super();

        console.log("Initialising Eye");

        this.sprite = new PIXI.Sprite.fromFrame("assets/eye.png");
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.x = 0.2;
        this.sprite.scale.y = 0.2;
    }     
    
};
