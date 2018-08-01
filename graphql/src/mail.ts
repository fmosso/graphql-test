// add to handler.js

var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');
import  * as  credential from './credentials';

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user:  credential.mailUser ,
        pass:  credential.mailPassword
    }
};



// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport(smtpConfig);


// setup e-mail data with unicode symbols
// send mail with defined transport object


    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages


export function send(mail, id){
   const link = "https://neuzkzc4df.execute-api.us-east-2.amazonaws.com/dev/confirmation/"
  // const link = "http://localhost:4000/confirmation/"
   const body =  "Hello sr:"+mail+",<br> Please Click on the link to verify your email.<br><a href="+link+id+ ">Click here to verify</a>"
   var mailOptions = {
        from: " Stack Bio  <awsfreetrial2018@gmail.com>", // sender address
        to: mail, // list of receivers
        subject : "Please confirm your Email account",
        html : body
    };
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.message);
        }
    });
}


