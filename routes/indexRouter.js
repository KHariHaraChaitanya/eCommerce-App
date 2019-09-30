const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Userdb= require('../models/userdb');
const templateManip=require('../controllers/indexControllers');
const multerreq=require('../config/multerinit');
let middleware = require('../config/passport');
let handlers=require('../controllers/handlergenerator');

// Welcome Page
router.get('/', (req, res) => {res.render('indexBA',login=req.session.email)});
//categories page
//router.get('/categories', function(req, res, next) {res.render('categoriesBA')});
//user dashboard  GET
router.get('/index', (req, res) =>{
   
  res.render('indexBA',login=req.session.email);
});
router.get('/admin',middleware.checkToken,(req, res) => {res.render('welcome')});

//add template
router.get('/upload', function(req, res, next) {res.render('upload')});
//delete
//add template
router.get('/userupload', function(req, res, next) {res.render('userupload')});

router.get('/delete/:id', templateManip.deleteTemplate);
//edit
router.get('/update/:id',templateManip.updateTemplate);
//search GET
router.get('/search',templateManip.searchTemplate);


router.get('/approve/:id',templateManip.templateApprove);


router.get('/disapprove/:id',templateManip.templateDisApprove);


//yet to write controllers

router.get('/dashboard', middleware.checkToken,function(req, res) {
  templateManip.getName(function(data){
  res.render('dashboard',{text:data,user:req.session.email});
  });
});


// router.get('/useradd', function(req, res, next) {
//   res.render('useradd')
// });
// router.post('/useradd',  function (req,res,next){
//   console.log(req.body);
  
//   if(req.body.isSubscriber=='on')
//   {
//     sub=true;
//   }
//   else{
//   sub = false;
//   }
//   if(req.body.isContributor=='on')
//   {
//     con=true;
//   }
//   else{
//   con = false;
//   }
  
//   var NewUser =new Userdb({
//     name:req.body.Name,
//     email:req.body.Email,
//     mobile:req.body.Mobile,
//     password:req.body.Password,
//     isSubscriber:sub,
//     isContributor:con
//   });
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(NewUser.password, salt, (err, hash) => {
//       if (err) throw err;
//       NewUser.password = hash;
//       NewUser
//  .save(function(err, result) 
//  {
//    if (err) console.log(err);  
//  })
//     });
//   });
//   //console.log(Name);
 
 
//   res.redirect('/userdetails');
// })

//upload template post
router.post('/upload',multerreq.single('TemplateImage'), templateManip.uploadTemplate);
//update post method
router.post('/update/:id',templateManip.templateUpdate);
//user uploads the template
router.post('/userupload',multerreq.single('TemplateImage'), templateManip.uploadTemplate);
module.exports = router;