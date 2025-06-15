const express =require("express");
const cors=require("cors");
const dotenv=require("dotenv").config();
const app=express();




// Database Connect
const ConnectDB=require("./DB/ConnectDB")

// routes

const AuthRouter=require("./routes/authRoute");
const userRoutes = require("./routes/userRoutes")

// Error MiddleWare
const GolbalError=require("./middlewares/ErrorMiddleware")

// This MiddleWare For body parser
app.use(express.json());


app.use("/api/auth",AuthRouter);
app.use("/api/users",userRoutes);

// This For Connect To Server From any client user 
app.use(cors({
    origin:"*",
    methods:["GET","POST","DELETE","PUT"],
}))

// Error MiddleWare
app.use(GolbalError);

app.listen(process.env.PORT,()=>{
    console.log(`listening on port:${process.env.PORT}....`)
    ConnectDB();
})