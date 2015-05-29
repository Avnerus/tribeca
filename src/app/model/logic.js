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

        this.statesActions=[
            ()=>{ //0
                input.onSend = null;
                this.selfie.clear();
                this.output.say(["Hi there", "Come here", "Hey good looking", "Hey handsome", "How about a selfie together?", "Hi, let's take a Selfie together"]
                    , () => {
                        console.log("Finished lines");
                        //this.selfie.snap();
                        setTimeout(this.statesActions[1],2000);
                    } );
            },
            ()=>{ //1
                this.output.say(["What is your name?"]);
                input.onSend = this.statesActions[2];
            },
            ()=>{ //2
                input.onSend = null;
                this.name = input.input.value;
                this.output.say(["Hi "+this.name+". Please face the camera and hug me"]
                , () => {
                    this.selfie.snap();
                    setTimeout(this.statesActions[3], 2000);
                } );
            },
            ()=>{ //3
                this.selfie.snap();
                setTimeout(this.statesActions[4], 2000);
            },
            ()=>{ //4
                input.onSend = this.statesActions[0];
                this.output.say(["I Love this picture ! We look such good friends!", "Best Friends Forever!", "Shall I send it to you?", "What's Your e-mail?"])
            }
        ]

        socketUtil.client.on('motion_detected', () => {
            console.log("Motion detected!! Running logic");
            this.run();
        });

        this.run(); // remove whon motion detection activated
    }

    run() {
        this.statesActions[0]();
    }
};
