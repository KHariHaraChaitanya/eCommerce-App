const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema=new Schema({
    //userId: ObjectId,
    name: String,
    email: String,
    mobile: String,
    password: String,
    isSubscriber: Boolean,
    isAdmin:Boolean,
    subscription : {
        packageId: Number,
        startDate: Date,
        endDate: Date,
       renewalDate: Date        
    },
    isContributor:Boolean,
    contributor : {
        Address: String,
        CreditPoints: Number,
        templates:Number,
        PaymentDetails: {
           AccountNumber: String,
           Bank: String,
           Branch: String,
           IFSC: String
       },
        Skillset: [String],
        Rating: {
           ratings: [Number],
           count: Number,
           //avg_rating: Decimal128,
        },
        //Comments: String,
        joiningDate:Date,
    },
    coupons:[String]
});
const Userdb=mongoose.model('user',userSchema);
module.exports={Userdb,
    
    saveUser:function(user,callback){
       // console.log(user);
        const newUser = new Userdb({
            name:user.name,
            email:user.email,
            mobile:user.mobile,
            password:user.password,
          });

        

          newUser.save()
          callback();
    },

    findUserById:function(conditions,callback){
        Userdb.findById(conditions,function(err,result){
            if(err){
              console.log(err);
            }
            else{
              console.log(result);
              callback(result);
            }
          }) 
    
      },
      findUserAndDelete:function(conditions,callback){
        Userdb.findByIdAndDelete(conditions,function(err,result){
            if(err){
              console.log(err);
            }
            else{
              console.log(result);
              callback(result);
            }
          }) 
    
      },

      updateUser:function(conditions,update,callback){
        Userdb.updateOne(conditions,update,function(err,result){
            if(err){
              console.log(err);
            }
            else{
              console.log(result);
              callback(result);
            }
          }) 
    
      },
      findUser:function(conditions,callback){
        Userdb.find(conditions,function(err,result){
            if(err){
              console.log(err);
            }
            else{
              callback(err,result);
            }
          }) 
    
      },
      updateUse:function(details,callback){     
        Userdb.updateOne({ "email": details.email }, 
          { $push: { "coupons": details.couponcode } },function(err,result){
             if(err){
                console.log(err);
             }
             callback(result);
          })
      },
      findCount: function(details,callback){
         
       Userdb.find({email:details}).exec(function (err, results) {
          if(err){
             console.log(err);
          }
          var count=0;
          for(var i=0;i<results[0].coupons.length;i++){
             if(results[0].coupons[i]==details.code) count++;
          }
          callback(count);
        });
      } 
}