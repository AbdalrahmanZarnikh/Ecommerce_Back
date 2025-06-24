const mongoose=require("mongoose");

const reviewSchema = mongoose.Schema({
    title:{
        type: String,
    },
    ratings: {
        type: Number,
        min: [1 , "Must be at least 1 star"],
        max: [5 , "Must be at most 5 star"],
        required: [true , "Rating required"]
    },
    user: {
        type : mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "user required"]
    },
    product: {
        type : mongoose.Schema.ObjectId,
        ref: "Product",
        required: [true,"Review must be long to product"]
    },
});

const reviewModel  = mongoose.model("Review",reviewSchema);
module.exports = reviewModel;