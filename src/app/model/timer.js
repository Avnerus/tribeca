'use strict'
import mathUtil from '../util/math'

export default class Timer {
    constructor() {
    }
    init() {
        console.log("Initialising timer");
        this.onThreshold = null;
        this.paused = true;
        this.reset();
    }
    update(dt) {
        if (this.paused) { 
            return;
        } else {
            this.timer += dt;
            if (this.thresholds.length > 0 && this.timer > this.thresholds[0]) {
                if (this.onThreshold) {
                    this.onThreshold(this.thresholds[0]);
                }
                if (this.thresholds.length > 1) {
                    this.thresholds = this.thresholds.slice(1);
                } else {
                    this.thresholds = [];
                }
            }
        }
    }
    reset() {
        this.timer = 0;
        this.thresholds = [6000, 9000, 12000, 50000];
    }
    stop() {
        this.reset();
        this.paused = true;
    }
    start() {
        this.reset();
        this.paused = false;
    }
    pause() {
        this.paused = true;
    }
    resume() {
        this.paused = false;
    }
};
