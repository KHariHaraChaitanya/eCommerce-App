var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var couponSchema = new Schema({
  couponName:{type:String ,required:true},
  couponCode:{type:String, required:true},
  startDate:{type:Date,required:true},
  endDate:{type:Date,required:true},
  Ispercentage:{type:Boolean, required:false},
  noOfUses:{type:Number,required:true},
  discount:{type:Number,required:false},
  maxDiscount:{type:Number,required:false}
})
var CouponModel = mongoose.model('CouponModel',couponSchema);
module.exports={
    CouponModel:mongoose.model('CouponModel',couponSchema),
     saveCoupon:function(details,callback){
         var Isper=false;

         if(details.IsPercentage==='percentage') Isper=true;
         var save_detail={
              couponName: details.couponName,
              couponCode: details.couponCode,
              startDate:details.startDate,
              endDate:details.endDate,
              Ispercentage:Isper,
              noOfUses:details.noOfUses,
              discount: details.discount,
              maxDiscount: details.maxDiscount
          }
        var coup = new CouponModel(save_detail);
        coup.save(function(err,result){
          if(err){
              console.log(err);
          }     
            callback(result) ;                    
          });
         
     },
     findCoupon:function(coupon,callback){
      
        CouponModel.findOne({couponCode:coupon},function(err,result){
          if(err){
            console.log(err);
          }
         
          callback(result);
        });
     },
     findAllcoups: function(callback){
        CouponModel.find({},function(err,result){
           if(err){
             console.log(err);
           }
           callback(result);
        });
     }
} 
