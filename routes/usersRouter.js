const express = require('express');
const router = express.Router();
const userManip=require('../controllers/usersControllers');
const templatedb=require('../models/template');
const User=require('../models/userdb');
const templateManip=require('../controllers/indexControllers');
let middleware = require('../config/passport');
let handlers=require('../controllers/handlergenerator');
var TemplateImage=require('../config/multerinit');
var coupons=require('../models/coupons');
var invoice = require('../services/InvoiceGenerator');

var bodyParser=require('body-parser')
// Login Page
router.get('/login',(req, res) => {
 
  res.render('login')
//console.log(req.headers);
});

// Register Page
router.get('/register',  handlers.login, (req, res) => res.render('register'));
//dashboard page
router.get('/dashboard', middleware.checkToken,function(req, res) {
  templateManip.getName(function(data){
  console.log(req.session.email);
  res.render('dashboard',{text:data,user:req.session.email});
  });
});

//templates
router.get('/templates',function(req, res) {
    templatedb.findTemplate({isApproved:true},function(err,result){
        res.render('templates',{text:result});
      })
});
router.get('/checkout',function(req,res){
user=req.session.email
  res.render('checkout.ejs',{price:2000,email:user.email,productname:"somePro"});
})
router.post('/checkout',function(req,res){
  if(req.body.price!=req.body.finalprice){
  User.updateUse(req.body,function(result){
    if(result)
      res.render('buyerdetails.ejs',{product:req.body});
    else 
       res.send('error occurred');
  });
} 
  else res.render('buyerdetails.ejs')
})
router.get('/buyerdetails',function(req,res){
  res.render('buyerdetails.ejs');
})
router.post('/buyerdetails',function(req,res){
  invoice.genInvoice(req.body);
  res.send('invoice generated');
})

router.post('/getDiscountedValue',function(req,res){
  userManip.getCouponfromDB(req.body.code,function(result){
    
    if(result){
      userManip.validateEnteredCoupon(result,req,res);
    }
   else res.send({warning:'invalid coupon code'});
  })
    })
router.get('/edituser/:id',(req, res) => {
  User.findUserById(req.params.id,(result)=>{
    
      res.render('edituser',{text:result});
    
  })
})
router.get('/userdelete/:id',function(req,res){
  User.findUserAndDelete(req.params.id,(result)=>{
    res.redirect('/dashboard');  
})
})
router.get('/designerdelete/:id',function(req,res){
  User.findUserAndDelete(req.params.id,(result)=>{
    res.redirect('/dashboard');  
})
})
router.post('/edituser/:id',function(req,res){
User.updateUser({_id: req.params.id},req.body,(result)=>{
  res.redirect('/dashboard');  
})
});

//update page
router.get('/userUpdate/:id', (req, res) =>{ res.render('userUpdate', {
  user: req.session.email
});});

router.get('/template',(req,res)=>{
  templateManip.getName((data)=>{
    res.send(data)
  })
})
router.get('/designeredit/:id',(req, res) => {
  User.findUserById(req.params.id,(result)=>{
    res.render('designeredit',{text:result});
})    
  })

router.post('/designeredit/:id',function(req,res){
  
User.updateUser({"_id": req.params.id},{$set:{"contributor.Address":req.body.Address,"contributor.CreditPoints":req.body.creditpoints},$push:{"contributor.Skillset":req.body.skillset,"contributor.Rating.ratings":req.body.Rating}},function (result) {
  
  res.redirect('/dashboard');
  
 
});
})
//add coupon
router.get('/addcoupon',  (req, res) => res.render('addcoupon.ejs'));

router.get('/categories',  (req, res) =>{ 
  res.render('categoriesBA.ejs')});

// Register
router.post('/register', userManip.userRegister);

// admin Login
router.post('/login',handlers.login,userManip.userLogin);

//user login
router.post('/userlogin',handlers.login,userManip.userLogin);

// Logout
router.get('/logout', userManip.userLogout);

//update
router.post('/userUpdate/:id', userManip.userUpdate);

//yet to write controllers
router.get('/designeradd', function(req, res, next) {
    if(!req.session.email)
    {
      res.redirect('/index');
    }
    else{
      res.render('designeradd');
    }
 
   
  });
router.post('/designeradd', function (req,res,next){
    user=req.session.email;
    
    User.updateUser({"_id":user._id},{$set:{"contributor.Address":req.body.Address,"isContributor":true},$push:{"contributor.Skillset":req.body.skillset}},function(err, result){
    
    res.redirect('/usersRouter/designeradd');
  }
  )
  
  })
//add coupon POST
router.post('/addcoupon',function(req,res){
  if(userManip.isValidCoupon(req.body))
  coupons.saveCoupon(req.body,function(result){ 
    if(result){
    res.send({text:'coupon added successfully'});
    }
    else{
    res.send({text:'coupon failed'});
    }
  });
})
router.post('/generatecoupon',function(req,res){
    var code= userManip.generateCode(req.body.name);
    res.send(code);
})

                               // -----------------------------------------------//


router.get('/user', function(req, res, next) {
   
 templateManip.getusers(function(data){
    res.send(data); 
});
});

// search
router.get('/search', userManip.search);


router.get('/designer', function(req, res, next) {
  
  templateManip.getdesigners(function(data){
    console.log(data);
    
    res.send(data);
});
});

module.exports = router;