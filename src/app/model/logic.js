import socketUtil from '../util/socket'

export default class Logic {
    constructor() {
        console.log("Logic constructed");
    }
    init(input, output, selfie, timer) {
        console.log("Initialising Logics with ", input, output, selfie, timer);
        this.output = output;
        this.selfie = selfie;
        this.input = input;
        this.timer = timer;

        this.timer.onThreshold = (number) => {this.onThreshold(number)}
        window.onmousemove = ()=> {
            this.resetTimer();
        }
        window.onkeydown = ()=> {
            this.resetTimer();
        }


        this.statesActions=[
            ()=>{ //0
                // TODO: choose random
                input.onSend = null;
                input.hide();
                this.selfie.clear();
                this.output.say(["Hi handsome", "Come here"]
                    , () => {
                        console.log("Finished lines");
                        this.goToState(1);
                    } );
            },
            ()=>{ //1
                // TODO: restart on no response
                input.show();
                this.output.say(["Let's take a Selfie together! What is your name?"]);
                input.onSend = () => {
                     this.goToState(2)
                }
            },
            ()=>{ //2
                input.hide();
                input.onSend = null;
                this.name = input.input.value;
                this.goToState(3);
            },
            ()=>{ //3
                this.output.say(["Hi "+this.name+". Please face the camera and hug me","3","2","1"]
                    , () => {
                        this.selfie.snap();
                        setTimeout(() => {
                            this.goToState(4);
                        }, 3000);
                    } );
            },
            ()=>{ //4 - IMAGE IS GOOD?
                this.selfie.clear();
                this.output.say(["I Love this picture ! We look such good friends!", "Best Friends Forever!"]
                    , () => {
                    this.goToState(5);
                } );
            },
            ()=>{ //5 - IMAGE IS GOOD?
                input.show();
                input.onSend = () => {
                    this.goToState(6);
                }
                this.output.say(["Shall I send it to you?"])
                this.timer.start();
            },
            ()=>{ //6 - YES
                // TODO: choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["No? Ok "+this.name+" let's take another one"]
                        , () => {
                           this.goToState(3);
                        } );
                }
                else{
                    input.show();
                    input.onSend = () => {
                        this.goToState(7);
                    }
                    this.output.say(["What's Your e-mail?"]);
                }
            },
            ()=>{ //7 - NO
                // TODO: choice
                input.show();
                input.onSend = null;
                this.output.say(["mmm...I don’t like myself so much, Let's take another one…"]
                    , () => {
                        this.goToState(3);
                    } );
            }
        ]
        this.histericalActions = [
            ()=>{ // Histerical 0
                this.output.say([this.name + "??", "Where are you??"]);
            },
        ];

        socketUtil.client.on('motion_detected', () => {
            console.log("Motion detected!! Running logic");
            this.run();
        });

        this.run(); // remove whon motion detection activated
    }

    resetTimer() {
        this.timer.reset();
        if (this.histerical) {
            this.histerical = false;
            this.goToState(this.currentState);
        }
    }
    goToState(number) {
        this.currentState = number;
        this.histerical = false;
        this.statesActions[number]();
    }

    goHisterical(number) {
        this.histerical = true;
        this.histericalState = number;
        this.histericalActions[number]();
    }

    onThreshold(time) {
        console.log("Passed Threshold!!!", time, this);
        this.goHisterical(0);
    }

    run() {
        this.goToState(0);
    }
};
