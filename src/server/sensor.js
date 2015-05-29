import serialPortObject from 'serialport';
const SerialPort = serialPortObject.SerialPort;

export default class Sensor {
    constructor() {
        console.log("Serial constructed");
        this.spark = null;
    }
    init() {
        console.log("Initialising serial");
        this.serialPort = new SerialPort("/dev/cu.usbserial-A7005Ozx", {
            baudrate: 9600,
            parser: serialPortObject.parsers.readline("\n")
        });
        this.serialPort.on("open",  () => {
          console.log('Serial Port open');
          this.serialPort.on('data', (data) => {
            console.log('Serial port data received: ' + data.toString());
            if (this.spark) {
                let message = data.toString();
                if (message.indexOf('ended') != -1) {
                    console.log('Sending motion_ended');
                    this.spark.send('motion_ended');
                } else if (message.indexOf('detected') != -1) {
                    console.log('Sending motion_detected');
                    this.spark.send('motion_detected');
                }
            }
          });
        });
    }
    setSpark(spark) {
        this.spark = spark;        
    }
};
