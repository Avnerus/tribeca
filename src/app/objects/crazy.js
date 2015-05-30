'use strict'
import GameObject from './game-object';

export default class Crazy extends GameObject {
    constructor() {
        super();
        console.log("Crazy constructed");

    }
    init() {
        console.log("Initialising Crazy");
        
    }

};
