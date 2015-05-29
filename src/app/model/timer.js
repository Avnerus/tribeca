'use strict'
import mathUtil from '../util/math'

export default class Timer {
    constructor() {
    }
    init() {
        console.log("Initialising timer");
        this.timer = 0;
    }
    update(dt) {
        this.timer += dt;
    }
    reset() {
        this.timer = 0;
    }
};
