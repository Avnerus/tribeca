'use strict'
import GameObject from './game-object';

export default class Eye extends GameObject {
    constructor() {
        super();

        console.log("Initialising Eye");
        this.texEyes = PIXI.Texture.fromFrame("assets/eyes.png");
        this.texBlink = PIXI.Texture.fromFrame("assets/blink.png");

        this.sprite = new PIXI.Sprite(this.texEyes);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.x = 0.2;
        this.sprite.scale.y = 0.2;
    }

    blink()
    {
        this.sprite.texture = this.texBlink;
        TweenMax.delayedCall(0.5, () => {
            this.sprite.texture = this.texEyes;
        });
    }

};
