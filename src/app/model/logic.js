export default class Logic {
    constructor() {
        console.log("Logic constructed");
    }
    initWithIO(output) {
        console.log("Initialising Logics with ", output);
        this.output = output;
    }
    run() {
        this.output.say(["Hello!", "How are you?", "Want to talk?"]);
    }
};
