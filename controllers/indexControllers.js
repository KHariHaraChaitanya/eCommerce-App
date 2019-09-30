const express = require('express');
const router = express.Router();
const template=require('../models/template');
const User= require('../models/userdb');
var multer=require('multer');
const multerreq=require('../config/multerinit');
var apr;



module.exports={

    //template update GET
    updateTemplate:function(req, res, next) {
        template.findOneTemplate({"_id":req.params.id},(err,obj)=>{
          if(err){
            console.log('error finding by _id');
          }
          else{
            res.render('update',{data:obj})
          }
        })},
        //delete GET
        deleteTemplate:function(req, res, next) {
            template.deleteTemplate(req.params.id,(err,obj)=>{
              if(err){
                console.log('error finding by _id');
              }
              else{
                res.redirect('/dashboard');
              }
            })},

       //search template GET 
      searchTemplate:function(req,res,next){
        console.log(req.query.search);
        var search=req.query.search;
        if(search==='')
        {
          res.redirect('/');
        }
        else{
          template.findTemplate({$text: {$search: search}},
             (function(err, docs) { 
                   if(err)
                   {
                     console.log(err);
                   }
                   else if(docs.count==0){
                    console.log('no docs found ');
                   }
                   else{
                    res.render('./search',{search:docs});
                   }
                 }));
          };  
      },
      //upload template GET
      uploadTemplate :  function (req,res,next){
        user=req.session.email;
        if(req.body.isApproved=='on')
        {
          apr=true;
        }
        else{
        apr = null;
        }  
        req.body.isApproved=apr;  
          template.saveTemplate(req,function(err, result) 
          {
            if (err) console.log(err);  
          })
           res.redirect('/dashboard');
        },
      
        //update template POST
        templateUpdate:function(req,res){
          template.updateTemplate({_id: req.params.id},req.body,function (err, place) {
            console.log(place);
            if(err)
            {
              console.log('error updating');
            }
            else{
            res.redirect('/dashboard');
            }
          });
          },
          //aproving template
          templateApprove:function(req,res){
            var name=req.body.TemplateName;
          template.updateTemplate({_id: req.params.id},  {$set:{"isApproved":true}},function (err, result) {
            
            if(err)
            {
              console.log('error updating');
            }
            else{
            res.redirect('/dashboard');
            }
          });
          },
          templateDisApprove:function(req,res){
            var name=req.body.TemplateName;
          template.updateTemplate({_id: req.params.id},  {$set:{"isApproved":false}},function (err, result) {
            
            if(err)
            {
              console.log('error updating');
            }
            else{
            res.redirect('/dashboard');
            }
          });
          },
          // get name function
        getName:function(callback){
            template.findTemplate({},function(err,objs){
             // console.log(objs);
                if(err){
                  console.log('Error finding docs');
                }
                if(objs.length===0){
                  console.log('no documents to show');
                  callback(objs);
                }
                else 
                {//console.log(objs); // this prints as it should
                  // User.findById("objs.userID").exec((err,obj)=>{
                  //   if(err){
                  //     console.log(err);
                  //   }
                  //   else{
                  //     callback(obj)
                  //   }
                  // })

                    callback(objs); 
                }
            });
          },
          //getting users

          getusers:  function (callback){
            User.findUser({}, function(err, objs){
                if(err){
                  console.log('Error finding docs');
                }
                if(objs.length===0){
                  console.log('no documents to show');
                  callback(objs); 
                }
                if (objs.length >= 1)
                {
                  callback(objs); 
                }
            });
          },
          //getiing the designers
          getdesigners:function (callback){
            User.findUser({isContributor:true}, function(err, objs){
              console.log(objs);
                if(err){
                  console.log('Error finding docs');
                }
                if(objs.length===0){
                  console.log('no documents to show');
                  callback(objs); 
                }
                if (objs.length >= 1)
                {
                  callback(objs); 
                }
            });
          }
    }