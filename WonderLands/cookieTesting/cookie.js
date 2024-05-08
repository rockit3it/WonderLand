const express = require("express");
const app = express();
// cookie parser is used to convert the cookies from readable form to somethig hashed or secret code
const cookieParser = require("cookie-parser");

//until we are not going to use this middleware we cannot get the cookies on the other route
app.use(cookieParser("secretcode"));
app.listen(8000, ()=>{
    console.log("app is listening on port 8000");
})
app.get("/",(req, res)=>{
    console.log(req.cookies);
    console.log("this is root");
    res.send("this is root");
})
// this route is going to show the un tempered cookies
app.get("/verify",(req, res)=>{
    console.log(req.signedCookies);
    res.send("verified");
})
app.get("/getCookies",(req, res)=>{
    //this is how we genrate the cookies
    res.cookie("greet", "namaste",{signed : true});
    res.cookie("hello", "india",{signed : true});
    res.cookie("nice","dubai",{signed : true});
    res.send("cookie send");
})