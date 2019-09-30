let jwt =  require('jsonwebtoken');
var user= require('../models/userdb');
let config = require('../config/config');
let middleware = require('../config/passport');
const userManip=require('../controllers/usersControllers');
const Headers= require('authorization-header');
const session = require('express-session');
module.exports= {
    login (req, res,next) {
      //let errors = [];
      if(!req.session.email){
      let username = req.body.email;
      let password = req.body.password;
      // For the given username fetch user from DB
     
    
      if (username && password) {
      
       
        user.findUser({email:username},(err,user)=>{
         
          if(user){
        if (username === user[0].email && password === user[0].password) 
        {
          let token = jwt.sign
          (
            {username: username},
            config.secret,
            
            { 
              expiresIn: '24h' // expires in 24 hours
            },
        
          );
          req.session.token=token;
         
              console.log(req.session.token);
              
        }

      }
      else{
            
            res.send(req.flash('error_msg'));
      }
    }
    )
      
      }
      
    } 
    else{
      res.send(req.flash('login_msg'));
    }
    next();
    },
         
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      })}

    }