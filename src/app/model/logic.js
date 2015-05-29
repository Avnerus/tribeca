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

        socketUtil.client.on('motion_detected', () => {
            console.log("Motion detected!! Running logic");            
            this.run();
        });
    }
    run() {
        this.output.say(["Hello!", "How are you?", "Smile!"], () => {
            console.log("Finished lines");
            this.selfie.snap();
        });
    }
};
