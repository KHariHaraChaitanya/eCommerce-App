
let jwt = require('jsonwebtoken');
const config = require('./config.js');
const authorization = require('authorization-header');
const User= require('../models/userdb');
let checkToken = (req, res, next) => {
  user=req.session.email;
  console.log(user.isAdmin);
  if(user.isAdmin==undefined){
    res.redirect('/index');
  }
  else{
  
  let token =req.session.token; // Express headers are auto converted to lowercase
 
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
       // res.redirect('/dashboard');
        next();
      }
    });
  } else {
    // return res.json({
    //   success: false,
    //   message: 'Auth token is not supplied'
    // });
    res.redirect('/index');
  }
}

};

module.exports = {
  checkToken: checkToken
}
