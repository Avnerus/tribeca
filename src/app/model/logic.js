import socketUtil from '../util/socket'

export default class Logic {
    constructor() {
        console.log("Logic constructed");
    }
    init(input, output, selfie) {
        console.log("Initialising Logics with ", input, output, selfie);
        this.output = output;
        this.selfie = selfie;
        this.input = input;
        this.mood = "calm"; //calm/ingage/crazy
        this.run(); // remove whon motion detection activated

        socketUtil.client.on('motion_detected', () => {
            console.log("Motion detected!! Running logic");
            this.run();
        });
    }
    run() {
        this.output.say(["Psss", "Hi there", "Come here", "Hey good looking", "Hey handsome", "How about a selfie together?", "Hi, let's take a Selfie together"], () => {
            console.log("Finished lines");
            this.selfie.snap();
            this.output.say(["What is your name?"]);
        });
    }
};
