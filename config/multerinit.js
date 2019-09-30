const template=require('../models/template');
var multer=require('multer');

//Multer initialization

var storage=multer.diskStorage({

  destination:function(req,file,cb){
  cb(null,'./public/public/images/');
},
filename:function(req,file,cb){
  cb(null,file.originalname);
}
});
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'||file.mimetype==='image/jpg'||file.mimetype==='video/mp4'||file.mimetype==='video/3gp')
  {
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}
var TemplateImage=multer({storage:storage,limits:{
  fileSize:1024*1024*5
},
fileFilter:fileFilter
});
module.exports=TemplateImage;