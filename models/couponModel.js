const mongoose=require("mongoose");

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true , "Coupon Name Required"],
        unique: [true , "Coupon Must Be Unique"]
    },
    expire: {
        type: Date,
        required: [true , "Coupon expired Date required"]
    },
    discount: {
        type: Number,
        required: [true , "Coupon discount required"]
    }
});

const couponModel = mongoose.model("Coupon" , couponSchema);
module.exports = couponModel;