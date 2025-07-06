const mongoose = require("mongoose");


const cartSchema = new mongoose.Schema(
  {
    cartItems:[
        {
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                default:1
            },
            color:String,
            price:Number
        }
    ]
    ,
    totalCartPrice:Number,
    totalPriceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }

  },
  { timestamps: true }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({ path: "user" ,select:"name _id "});
  this.populate({ path: "cartItems.product" ,select:"title _id "});
  next();
});

const CartModel = mongoose.model("Cart", cartSchema);

module.exports = CartModel;
