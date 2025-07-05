const mongoose=require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems:[
    {
        product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        }
        ,
        quantity:{
            type:Number,
            default:1
        },
        color:String,
        price:Number
    }
  ],
  shippingAddress:{
    phone:String,
    city:String,
    details:String
  },
  taxPrice:{
    type:Number,
    default:0
  },
  totalOrderPrice:Number,
  user:{
    type:mongoose.Schema.ObjectId,
    ref:"User"
  },
  paymentMethod:{
    type:String,
    enum:["cash","hawala"],
    default:"cash"
  },
  isPaid:{
    type:Boolean,
    default:false
  },
  paidAt:Date,
  hawalaCompany:String,
  hawalaCode:{
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
  }

});

orderSchema.pre(/^find/, function (next) {
  this.populate({ path: "user" ,select:"name _id "});
  this.populate({ path: "product" ,select:"title _id "});
  next();
});


const orderModel = mongoose.model("Order" , orderSchema);
module.exports = orderModel;