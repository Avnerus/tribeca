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
                // TODO: choose random
                input.onSend = null;
                input.hide();
                this.selfie.clear();
                this.output.say(["Hi handsome", "Come here"]
                    , () => {
                        console.log("Finished lines");
                        this.statesActions[1]();
                    } );
            },
            ()=>{ //1
                // TODO: restart on no response
                input.show();
                this.output.say(["Let's take a Selfie together! What is your name?"]);
                input.onSend = this.statesActions[2];
            },
            ()=>{ //2
                input.hide();
                input.onSend = null;
                this.name = input.input.value;
                this.statesActions[3]();
            },
            ()=>{ //3
                this.output.say(["Hi "+this.name+". Please face the camera and hug me","3","2","1"]
                    , () => {
                        this.selfie.snap();
                        setTimeout(this.statesActions[4], 3000);
                    } );
            },
            ()=>{ //4 - IMAGE IS GOOD?
                this.selfie.clear();
                this.output.say(["I Love this picture ! We look such good friends!", "Best Friends Forever!", "Shall I send it to you?"]
                    , () => {
                    this.statesActions[5]();
                } );
            },
            ()=>{ //5 - IMAGE IS GOOD?
                input.show();
                input.onSend = this.statesActions[6];
                this.output.say(["Shall I send it to you?"])
            },
            ()=>{ //6 - YES
                // TODO: choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["No? Ok "+this.name+" let's take another one"]
                        , () => {
                            this.statesActions[3]();
                        } );
                }
                else{
                    input.show();
                    input.onSend = this.statesActions[7];
                    this.output.say(["What's Your e-mail?"]);
                }
            },
            ()=>{ //7 - NO
                // TODO: choice
                input.show();
                input.onSend = this.statesActions[0];
                this.output.say(["mmm...I don’t like myself so much, Let's take another one…"]
                    , () => {
                        this.statesActions[3]();
                    } );
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
