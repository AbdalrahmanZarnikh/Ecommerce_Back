const express =require("express");
const cors=require("cors");
const dotenv=require("dotenv").config();
const app=express();




// Database Connect
const ConnectDB=require("./DB/ConnectDB")

// routes

const AuthRouter=require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")
const brandRoutes=require("./routes/brandRoutes")
const wishlistRoutes=require("./routes/wishlistRoutes")
const couponRoutes = require("./routes/couponRoutes")
const addressRoutes = require("./routes/addressRoutes")
const cartRoutes=require("./routes/cartRoutes")
const reviewRoutes = require("./routes/reviewRoutes");
const orderRoutes = require("./routes/orderRoutes");
const messageRoutes = require("./routes/messageRoutes");




app.use(cors({
    origin:"*",
    methods:["GET","POST","DELETE","PUT"],
    
}))

// Error MiddleWare
const GolbalError=require("./middlewares/ErrorMiddleware")

// This MiddleWare For body parser
app.use(express.json());

// routes
app.use("/api/auth",AuthRouter);
app.use("/api/users",userRoutes);
app.use("/api/categories",categoryRoutes);
app.use("/api/products",productRoutes);
app.use("/api/brands" , brandRoutes);
app.use("/api/wishlists" ,wishlistRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/messages", messageRoutes);


// Error MiddleWare
app.use(GolbalError);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port:${process.env.PORT}....`)
    ConnectDB();
})