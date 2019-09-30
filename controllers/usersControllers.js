//const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const ishe=require('../config/passport');
const User= require('../models/userdb');
const template=require('../models/template');
var voucher_codes=require('voucher-code-generator');
var mailer = require('../services/emailService');
var coupons = require('../models/coupons');
module.exports={
  // user register controll
userRegister:function(req,res){
  
                  const { name, email, mobile,password, password2 } = req.body;
            let errors = [];
            
            if (!name || !email || !password || !password2) {
              errors.push({ msg: 'Please enter all fields' });
            }

            if (password != password2) {
              errors.push({ msg: 'Passwords do not match' });
            }

            if (password.length < 6) {
              errors.push({ msg: 'Password must be at least 6 characters' });
            }

            if (errors.length > 0) {
              res.render('register', {
                errors,
                name,
                email,
                mobile,
                password,
                password2
              });
            } else {
              //User.findOne({ email: email }).then(user => {
                User.findUser({email:email},(user)=>{
                if (user) {
                  
                  errors.push({ msg: 'Email already exists' });
                  res.render('register', {
                    errors,
                    name,
                    email,
                    mobile,
                    password,
                    password2

                  });
                }
                else {
                  var html = '<h2>Welcome '+name+' </h2>\
                  <body> Thank you for registering with us\
                   </body> ';
                  var mailingDetails={
                    from:'"Chitrakars"<chaitanya@thechitrakars.com>',
                    to:email,
                    name:"Chitrakar",
                    subject:"Registered successfully",
                    html:html,
                  }
                  mailer.mailOnce(mailingDetails);
                  User.saveUser(req.body,() => {
                    
                    req.flash(
                      'success_msg',
                      'You are now registered and can log in'
                    );
                    res.redirect('/');
                  })
                  
                  //var newUser=User.createUser;

                
                }
              });
            }

    },

    //user login controll
    userLogin:function(req,res,next){
   // console.log(req.body.email);
   User.findUser({email:req.body.email},(err,user)=>{
    req.session.email=user[0];
    console.log(req.session.email);
    if(user[0].isAdmin == undefined )
    {
  
  res.redirect('/index');
    }
    else{
      res.redirect('/dashboard');
    }
  });
  //user= req.session.user;
  
      
    },

    //user logout controll
    userLogout:function(req,res){
      req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/index');
          });
      //req.logout();
     // req.flash('success_msg', 'You are logged out');
     
      
     
    },
    getCouponfromDB:function(code,callback){
      coupons.findCoupon(code,function(result){
        callback(result);
      })
    },
    //user update controll
    userUpdate:function(req,res){

  
      const { name, email } = req.body;
            var conditions=req.params.id;
            console.log(conditions);
            console.log('password encrypted');

            User
            .updateUser({"_id":conditions},req.body,function(result){
              if(err)
              {
                console.log(err);

              }
              
              res.redirect('/dashboard');
        
        });
        
          },

       //generating Coupon Code
       
       generateCode: function (name){
        var today = new Date();
        var random_code= voucher_codes.generate({
        length: 8,
        count: 1,
        charset: voucher_codes.charset("alphanumeric"),
        prefix:name.toString().substring(0,3),
        postfix: today.getFullYear().toString().substring(2,4)
      });

      return random_code[0];
      },
       isValidCoupon:function(couponValues){
        if(!couponValues.couponName) return false;
        if(!couponValues.couponCode) return false;
        if(!couponValues.startDate) return false;
        if(!couponValues.endDate) return false;
        if(couponValues.startDate>couponValues.endDate) return false;
        if(couponValues.noOfUses<=0) return false;
        if(couponValues.discount>100 || couponValues.discount<0) return false; 
        return true;
      },
      validateEnteredCoupon:function(result,req,res){
        var today = new Date();
        User.findCount(req.body.email,function(count){
          if(count<result.noOfUses){      
            if(today>=result.startDate && today<=result.endDate){
            var fprice_disc=0,fprice_cashb=0;
            if(result.discount!=null){
               fprice_disc = parseInt(parseFloat(req.body.price)*(1-(parseFloat(result.discount)/100)));
            }
            if(result.maxDiscount!=null){
               fprice_cashb = parseFloat(req.body.price)-parseFloat(result.maxDiscount);
            }
            if(fprice_cashb<0){
               fprice_cashb=0;
            }
            if(fprice_cashb>fprice_disc)
            res.send({fprice:fprice_cashb});  
            else res.send({fprice:fprice_disc})
          }
          else
            res.send({warning: 'coupon invalid'})
        }
        else res.send({warning:'coupon usage has reached its limit'});
        });
      },
      // Searching method

      search:function(req,res){
        var search=req.query.search;
        if(search==='')
  {
    console.log('enter some text');
   res.redirect('/dashboard');
  }
  else{
   
   template.findTemplate({$text: {$search: search}},function(err, docs) {
            if(err)
            {
              console.log(err);
            }
            else if(docs.count==0){
             console.log('no docs found ');
            }
            else{
             //console.log(docs);
             //res.json(obj);                        Note: 1)create index automatically not manually
             //
             console.log(docs);                                    
             res.render('search',{search:docs});
            }
          });
   };
      },

      
}


