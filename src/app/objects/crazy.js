'use strict'
import GameObject from './game-object';

export default class Crazy extends GameObject {
    constructor() {
        super();
        console.log("Crazy constructed");

    }
    init(assets) {
        console.log("Initialising Crazy with assets: ", assets);
        this.container = new PIXI.Container();
        for (let i = 0; i < assets.length; i++) {
            let texture = PIXI.Texture.fromFrame("assets/" + assets[i] + ".png");
            let sprite = new PIXI.Sprite(texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.scale.x = 0.75;
            sprite.scale.y = 0.75;

            let increase = Math.random();
            let time = Math.random();
            TweenMax.to(sprite.scale, time, {ease: Linear.easeNone, repeat: -1, yoyo: true, x: 1 + increase, y: 1 + increase});


            this.container.addChild(sprite);
        }                
    }

};
