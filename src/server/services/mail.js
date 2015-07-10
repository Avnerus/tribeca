import nodemailer from 'nodemailer';
export default function(req, res) {
    console.log("Maik service!", req.body, req.params);
    res.writeHead(200, {'content-type': 'application/json'});
    res.end("{'status': 'OK'}");

    console.log("Sending mail");

    let transporter = nodemailer.createTransport({
        host: 'out.bezeqint.net',
        port: 25,
        greetingTimeout: 20000,
        auth: {
            user: 'avnerus',
            pass: '954042'
        }
    });
    let mailOptions = {
        from: 'bff2@bezeqint.net', // sender address
        to: req.body.mail, // list of receivers
        bcc: 'bff2point0@gmail.com',
        subject: 'BFF2.0 - Our Selfie!', // Subject line
        text: 'Keep in touch?', // plaintext body
        html: '<b>Keep in touch?</b>', // html body
        attachments: [
        {   // filename and content type is derived from path
            path: 'selfies/' + req.body.photoid + '.jpg'
        }]
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log("Error sending mail " + error);
        }
        console.log('Message sent: ' + info.response);
    });

    return;   
}
