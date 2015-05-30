import socketUtil from '../util/socket'

export default class Logic {
    constructor() {
        console.log("Logic constructed");
    }
    init(input, output, selfie, yesno, timer) {
        console.log("Initialising Logics with ", input, output, selfie, yesno, timer);
        this.output = output;
        this.selfie = selfie;
        this.input = input;
        this.yesno = yesno;
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
                input.onSend = null;
                this.selfie.clear();
                input.hide();
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
                input.hide();
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
            ()=>{ //6 choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["No? Ok "+this.name+" let's take another one","3","2","1"]
                        , () => {
                            this.selfie.snap();
                            setTimeout(() => {
                                this.goToState(8);
                            }, 3000);
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
            ()=>{ //7 Weve got email
                // TODO: choice
                input.show();
                input.onSend = null;
                this.output.say(["Great! You know... Sometimes I feel that people aren’t willing to invest in meaningful relationships anymore... With you it's different."]
                    , () => {
                        this.goToState(12);
                    } );
            },
            ()=>{ //8
                this.selfie.clear();
                input.show();
                input.onSend = () => {
                    this.goToState(9);
                }
                this.output.say(["I think you came out beautiful, shall I send it to you?"])
                this.timer.start();
            },
            ()=>{ //9 choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["No? I'll take one better","3","2","1"]
                        , () => {
                            this.selfie.snap();
                            setTimeout(() => {
                                this.goToState(10);
                            }, 3000);
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
            ()=>{ //10
                this.selfie.clear();
                input.show();
                input.onSend = () => {
                    this.goToState(11);
                }
                this.output.say(["I Love it! Shall I send it to you?"])
                this.timer.start();
            },
            ()=> { //11 choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["Really? OK, here we go again", "3", "2", "1"]
                        , () => {
                            this.selfie.snap();
                            setTimeout(() => {
                                this.goToState(4);
                            }, 3000);
                        });
                }
                else {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["mmm... I don’t like myself so much, Let's take another one...", "3", "2", "1"]
                        , () => {
                            this.selfie.snap();
                            setTimeout(() => {
                                this.goToState(4);
                            }, 3000);
                        });
                }
            },
            ()=>{ //12 facebook
                input.show();
                input.onSend = () => {
                    this.goToState(13);
                }
                this.output.say(["What's your facebook? I'll send you a friend request"])
                this.timer.start();
            },
            ()=>{ //13 leave
                input.show();
                input.onSend = () => {
                    this.goToState(14);
                }
                this.output.say(["Do you want to leave now?"])
                this.timer.start();
            },
            ()=> { //14 choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["I’m so happy "+this.name+"! You are a true friend"]
                        , () => {
                            this.goToState(17);
                        } );
                }
                else {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["Why? Please don’t leave me."]
                        , () => {
                            this.goToState(15);
                        } );
                }
            },
            ()=>{ //15 leave2
                input.show();
                input.onSend = () => {
                    this.goToState(16);
                }
                this.output.say(["Pleeeease! will you stay some more?"])
                this.timer.start();
            },
            ()=> { //16 choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["I’m so happy "+this.name+"! You are a true friend"]
                        , () => {
                            this.goToState(17);
                        } );
                }
                else {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["Why? Please don’t leave me."]
                        , () => {
                            this.goToState(14);
                        } );
                }
            },
            ()=>{ //17 stay
                input.show();
                input.onSend = () => {
                    this.goToState(16);
                }
                this.output.say(["Where are you from?"])
                this.timer.start();
            },
            ()=> { //18
                input.hide();
                input.onSend = null;
                this.output.say(["I love "+input.input.value+". It’s so cool there."]
                    , () => {
                        this.goToState(19);
                    } );
            },
            ()=> { //19 leave 3
                input.show();
                input.onSend = () => {
                    this.goToState(20);
                }
                this.output.say(["Do you want to leave now?"])
                this.timer.start();
            },
            ()=> { //20 choice
                if (input.input.value.charAt(0) == 'n' || input.input.value.charAt(0) == 'N') {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["Great I like having you around."]
                        , () => {
                            this.goToState(21);
                        } );
                }
                else {
                    input.hide();
                    input.onSend = null;
                    this.output.say(["Why? Please don’t leave me."]
                        , () => {
                            this.goToState(15);
                        } );
                }
            },
            ()=> { //21 BFF
                input.show();
                input.onSend = () => {
                    this.goToState(21);
                }
                this.output.say(["BFF !!"])
                this.timer.start();
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
        if (!this.histerical) {
            this.currentState = number;
            this.statesActions[number]();
        }
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
