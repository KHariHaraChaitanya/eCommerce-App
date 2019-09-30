const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var textSearch = require('mongoose-text-search');
/* GET home page. */
const TemplateSchema = new Schema({
  TemplateName: {
    type: String,
    required: false
  },
  TemplateImage:{
    type:String,  
    required:false
  },
  TemplateDescription: {
    type: String,
    required: false
  },
  Categories:{
      type:String,
      required:false
  },
  Brand:{
    type:String,
    required:false
},
isApproved:{
  type:Boolean,
  required:false
},
userID:{
  type:String,
  required:false
},
userName:{
  type:String,
  required:false
},
price:{
type:Number,
required:false
}

});
var template = mongoose.model('template', TemplateSchema);
TemplateSchema.plugin(textSearch);
const index = {'name':'text', 'description':'text' , 'Categories':'text' , 'Brand':'text'};
TemplateSchema.index(index);

module.exports ={ 
   findTemplate:function(conditions,callback){
    template.find(conditions,function(err,result){
      if(err){
        console.log(err);
      }
      else{
        //console.log(result);
        callback(err,result);
      }
    }) 
   
    
  },
  updateTemplate:function(conditions,update,callback){
    template.updateOne(conditions,update,function(err,result){
        if(err){
          console.log(err);
        }
        else{
          callback(err,result);
        }
      }) 

  },
  saveTemplate:function(req,callback){
    // console.log(user);
    user=req.session.email;
    var Newtemplate = new template({
      TemplateName:req.body.TemplateName,
      TemplateImage:req.file.path,
      TemplateDescription:req.body.TemplateDescription,
      Categories:req.body.Categories,
      Brand:req.body.Brand,
      isApproved:req.body.isApproved,
      userID:user._id,
      userName:user.name
    });

     

       Newtemplate.save()
       callback();
 },
 deleteTemplate:function(conditions,callback){
  template.findByIdAndDelete(conditions,function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log(result);
        callback(err,result);
      }
    }) 

},
findOneTemplate:function(conditions,callback){
  template.findOne(conditions,function(err,result){
    if(err){
      console.log(err);
    }
    else{
      //console.log(result);
      callback(err,result);
    }
  }) 
 
  
},
}
