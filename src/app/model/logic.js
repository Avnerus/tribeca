import socketUtil from '../util/socket'
import mathUtil from '../util/math'
import fetchUtil from '../util/fetch'

export default class Logic {
    constructor() {
        console.log("Logic constructed");
    }
    init(input, output, selfie, yesno, timer, crazy, stevie) {
        console.log("Initialising Logics with ", input, output, selfie, yesno, timer, crazy, stevie);
        this.output = output;
        this.selfie = selfie;
        this.input = input;
        this.yesno = yesno;
        this.timer = timer;
        this.crazy = crazy;
        this.stevie = stevie;

        this.stevie.loop = true;

        this.timer.onThreshold = (number) => {this.onThreshold(number)}
        window.onmousemove = ()=> {
            this.resetTimer();
        }
        window.onkeydown = ()=> {
            this.resetTimer();
        }


        this.goIdle();

        this.statesActions=[
            ()=>{ //0
                this.timer.stop();
                this.location = "";
                yesno.hide();
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
                this.timer.start();
            },
            ()=>{ //2
                this.timer.stop();
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
                this.output.say(["I Love this picture ! We look like such good friends!", "Best Friends Forever!"]
                    , () => {
                    this.goToState(5);
                } );
            },
            ()=>{ //5 - IMAGE IS GOOD?
                yesno.show();
                yesno.onAnswer = () => {
                    console.log("Image is good answer - going to state 6");
                    this.goToState(6);
                }
                this.output.say(["Shall I send it to you?"])
                this.timer.start();
            },
            ()=>{ //6 choice
                this.timer.stop();
                yesno.hide();
                if (yesno.answer == 'NO') {
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
                    this.timer.start();
                }
            },
            ()=>{ //7 Weve got email
                // TODO: choice
                input.hide();
                input.onSend = null;
                this.sendMail(input.input.value, this.selfie.photoId);
                this.timer.stop();
            this.output.say(["Great!", "You know...", "Sometimes I feel that people", "aren’t willing to invest", "in meaningful relationships anymore...", "With you it's different."]
                    , () => {
                        this.goToState(12);
                    } );
            },
            ()=>{ //8
                this.selfie.clear();
                yesno.show();
                yesno.onAnswer = () => {
                    this.goToState(9);
                }
                this.output.say(["I think you came out beautiful, shall I send it to you?"])
                this.timer.start();
            },
            ()=>{ //9 choice
                this.timer.stop();
                yesno.hide();
                if (yesno.answer == 'NO') {
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
                yesno.show();
                yesno.onAnswer = () => {
                    this.goToState(11);
                }
                this.output.say(["I Love it! Shall I send it to you?"])
                this.timer.start();
            },
            ()=> { //11 choice
                this.timer.stop();
                yesno.hide();
                if (yesno.answer == 'NO') {
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
                this.timer.stop();
                input.hide();
                yesno.show();
                yesno.onAnswer = () => {
                    this.goToState(14);
                }
                this.output.say(["Do you want to leave now?"])
                this.timer.start();
            },
            ()=> { //14 choice
                this.timer.stop();
                yesno.hide();
                if (yesno.answer == 'NO') {
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
                yesno.show();
                yesno.onAnswer = () => {
                    this.goToState(16);
                }
                this.output.say(["Pleeeease! will you stay some more?"])
                this.timer.start();
            },
            ()=> { //16 choice
                this.timer.stop();
                yesno.hide();
                if (yesno.answer == 'YES') {
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
            ()=>{ //17 stay
                input.show();
                input.onSend = () => {
                    this.goToState(18);
                }
                this.output.say(["Where are you from?"])
                this.timer.start();
            },
            ()=> { //18
                this.timer.stop();
                input.hide();
                input.onSend = null;
                this.location = input.input.value
                this.output.say(["I love "+this.location+". It’s so cool there."]
                    , () => {
                        this.goToState(19);
                    } );
            },
            ()=> { //19 leave 3
                yesno.show();
                yesno.onAnswer = () => {
                    this.goToState(20);
                }
                this.output.say(["Do you want to leave now?"])
                this.timer.start();
            },
            ()=> { //20 choice
                this.timer.stop();
                yesno.hide();
                if (yesno.answer == 'NO') {
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
                this.timer.stop();
                input.show();
                input.onSend = () => {
                    this.goToState(21);
                }
                this.output.say(["BFF !!"])
                this.timer.start();
            }
        ]

        this.histericalActions = [
            ()=> { // 0
                this.output.say([this.name + "?"]);
            },
            ()=> { // 1
                this.output.say(["Hey " + this.name + " are you there?"]);
            },
            ()=> { // 2
                this.output.say([this.name + " you’re not answering! Hey!"]);
            },
 		    () => {
                let self = this;
                self.showCrazy();
                self.input.hide();
                self.selfie.clear();
                self.yesno.hide();

                let lines = [
                    self.name.replace("a","aaaa").replace("o", "ooo").replace("e", "eeee").replace("i","eee"),
                    self.name + " where are yoooooo??",
                    self.name + " Pleeeease don't leeeeave meeee!",
                    "Anyone seen " + self.name + "????",
                    self.name + " come baaaaaack!"

                ]
                function histericCall() {
                    if (self.histerical) {
                        let speakLine = lines[mathUtil.getRandomInt(0,lines.length)];
                        self.output.say([speakLine], histericCall, true);
                    }
                }
                histericCall();
            }

        ];

        socketUtil.client.on('motion_detected', () => {
            console.log("Motion detected!! Running logic");
            if (this.idle) {
                this.run();
            }
        });
    }

    resetTimer() {
        this.timer.reset();

        if (this.histerical && this.histericalState == 3)
        {
            this.histerical = false;
            this.output.stop();
            this.hideCrazy();
            this.timer.stop();
            this.output.say([this.name+"? Have you come back to me?"]);
            this.yesno.show();
            this.yesno.onAnswer = () => {
                this.yesno.hide();
                if (this.yesno.answer == 'NO')
                {
                    this.goIdle();
                    this.run();
                } else {
                    console.log("Came back to me. Going to state: ", this.currentState);
                    this.goToState(this.currentState);
                }
            }
        } else {
            if (this.histerical) {
                this.histerical = false;
                this.goToState(this.currentState);
            }
        }
    }
    goToState(number) {
        if (!this.histerical) {
            this.timer.stop();
            this.currentState = number;
            this.statesActions[number]();
        }
    }

    goHisterical(number) {
        this.histerical = true;
        this.histericalState = number;
        this.histericalActions[number]();
    }

    showCrazy() {
        this.crazy.container.visible = true;
    }
    hideCrazy() {
        this.crazy.container.visible = false;
    }

    onThreshold(time) { // 6000, 9000, 12000, 50000
        console.log("Passed Threshold!!!", time, this);
        if (this.currentState < 3) {
            if (time == 9000) {
                this.goIdle();
                this.histerical = false;
            }
        }
        else if (time == 5000)
            this.goHisterical(0);
        else if (time == 9000)
            this.goHisterical(1);
        else if (time == 12000)
            this.goHisterical(2);
        else if (time == 15000)
            this.goHisterical(3);
        else
            {
                this.goIdle();
                this.histerical = false;
            }
    }

    sendMail(mail, id) {
        console.log("Send mail!", mail, id);
        fetchUtil.postJSON('http://localhost:3000/mail', {"mail": mail, "photoid": id})
        .then(function(err, data) {
            console.log("Posted ", err, data);
        })
    }

    goIdle() {
        this.idle = true;
        this.input.hide();
        this.selfie.clear();
        this.yesno.hide();
        this.hideCrazy();
        this.output.clear();
        this.stevie.play();
    }

    run() {
        this.idle = false;
        this.stevie.pause();
        this.stevie.fastSeek(0);
        this.goToState(0);
    }
};
