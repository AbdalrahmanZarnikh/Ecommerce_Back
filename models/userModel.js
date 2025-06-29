const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "user name required"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "user email required"],
      unique: [true, "email must be unique"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "user password required"],
      minlength: [8, "password must be at least 8 characters long"],
    }
    ,
    changedPasswordAt: Date,
    passwordResetCode: String,
    passwordResetCodeVerify: Boolean,
    passwordResetCodeExpires: Date,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
      },
    ],
    addresses: [
      {
        id: { type: mongoose.Schema.ObjectId },
        phone: String,
        city: String,
        details: String,
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
