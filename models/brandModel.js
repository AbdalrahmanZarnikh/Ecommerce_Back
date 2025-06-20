const mongoose=require("mongoose");

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true , "Brand Required"],
        unique: [true, "Brand must be unique"],
        minlength: [3, "Too Short Brand Name"],
        maxLength: [32 , "Too Long Nrand Name"]
    },
    slug: {
        type: String,
        lowercase: true,
    },
    image: {
        url: {
            type: String,
        },
        public_id: {
            type: String,
        },
    },
});
const Brand = mongoose.model("Brand" , brandSchema)

module.exports = Brand;