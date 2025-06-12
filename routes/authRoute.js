const express=require("express");

const {Signup,Login,ForgotPassword,VerifyResetCode,ResetPassword}=require("../controllers/authController")

const router=express.Router()

router.post("/signup",Signup);

router.post("/login",Login);

router.post("/forgotPassword",ForgotPassword);

router.post("/verifyResetCode",VerifyResetCode);

router.put("/resetPassword",ResetPassword);


module.exports=router