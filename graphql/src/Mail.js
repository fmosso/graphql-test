// add to handler.js

var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');


var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "user",
        pass: "pass"
    }
};

var poolConfig = {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: "user",
        pass: "pass"
    }
};



// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport(smtpConfig);


// setup e-mail data with unicode symbols
// send mail with defined transport object


    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages


export function send(mail, id){
   const link = "http://sometimesredsometimesblue.com/"
   const body =  "Hello sr:"+id+",<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
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


