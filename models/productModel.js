const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "producttitle required"],
      minLength: [3, "Too Short Product Title"],
      maxLength: [32, "Too Long Product Title"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "Product Description required"],
      minLength: [20, "To Short Product Description"],
    },
    quantity: {
      type: Number,
      required: [true, "Product Quantity required"],
    },
    sold: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "Product Price Required"],
    },
    priceAfterDiscount: {
      type: Number,
    },
    colors: [String],
    image: {
      url: String,
      public_id: String,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Product Must Belong To Category"],
    },
    brand: {
      type: mongoose.Schema.ObjectId,
      ref: "Brand",
    },
    ratingsAverage: {
      type: Number,
      min: [1, "Rating must be above or equal 1.0"],
      max: [5, "Rating must be below or equal 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre(/^find/, function (next) {
  this.populate({ path: "category" ,select:"name _id "});
  this.populate({ path: "brand" ,select:"name _id "});
  this.populate({path:"reviews",select:"_id -product -__v "})
  next();
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
