var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  host:'mail.thechitrakars.com',
  port:465,
  secure:true,
  auth: {
    type: 'login',
    user: 'chaitanya@thechitrakars.com',
    pass: 'Chitrakars@123'
  }
});
var html = '<h2>Recent templates </h2>\
        <body> <img src="https://storage.googleapis.com/businessads-staging3/frames/5b3c6c6506e6c532d86a08aa/5b3c6c6506e6c532d86a08aa_15.jpg" alt="chitrakar logo">\
        </body> ';

module.exports={
    mailOnce: function(mailingDetails){
     transporter.sendMail(mailingDetails, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    }
}