'use strict'
import GameObject from './game-object';

export default class Eye extends GameObject {
    constructor() {
        super();

        console.log("Initialising Eye");
        this.texHappy = PIXI.Texture.fromFrame("assets/happy.png");
        this.texMad = PIXI.Texture.fromFrame("assets/Mad.png");
        this.texNoPupils = PIXI.Texture.fromFrame("assets/noPupils.png");
        this.texNormal = PIXI.Texture.fromFrame("assets/normal.png");
        this.texSad = PIXI.Texture.fromFrame("assets/sad.png");
        this.texSurprised = PIXI.Texture.fromFrame("assets/surprised.png");
        this.texPupil = PIXI.Texture.fromFrame("assets/Pupil.png");
        this.texBlink = PIXI.Texture.fromFrame("assets/WINK.png");

        this.sprite = new PIXI.Sprite(this.texHappy);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.scale.x = 1;
        this.sprite.scale.y = 1;
    }

    blink()
    {
        let lastTex = this.sprite.texture
        this.sprite.texture = this.texBlink;
        TweenMax.delayedCall(0.5, () => {
            this.sprite.texture = lastTex;
        });
    }

    normal()
    {
        this.sprite.texture = this.texNormal;
    }

    happy()
    {
        this.sprite.texture = this.texHappy;
    }

    mad()
    {
        this.sprite.texture = this.texMad;
    }

    noPupils()
    {
        this.sprite.texture = this.texNoPupils;
    }

    sad()
    {
        this.sprite.texture = this.texSad;
    }

    surprised()
    {
        this.sprite.texture = this.texSurprised;
    }

    randomMood()
    {
        let mood = Math.floor(Math.random() * 5);
        switch(mood) {
            case 0:
                this.happy();
                break;
            case 1:
                this.mad();
                break;
            case 2:
                this.noPupils();
                break;
            case 3:
                this.sad();
                break;
            case 4:
                this.surprised();
                break;
            default:
                this.normal();
                break;
        }
    }
};
