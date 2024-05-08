const express = require("express");
const app = express();
const session = require("express-session")
const flash = require("connect-flash");

const sessionOptions = {
        secret : "mySuperSecretString", 
        resave : false, 
        saveUninitialized : true,
        
        };
        // this 
        app.use(flash());
        // session options is a variable which containing the options in the session we can directly give the session options
    app.use(session(sessionOptions));
    app.listen(3000, ()=>{
    console.log("app is listning on port 3000");
})

app.get("/register",(req, res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    // console.log(res.session.name);
    //to create flash req.flash(key , value);  
    req.flash("success","user register succesfully");
    res.redirect("/hello");
})

app.get("/hello", (req, res)=>{
    //this route is handling the flash request we are getting the redirect request from the /register and 
    //now whereever we want to access the flash we cam use by using key and it is only for one time
    res.render("../views/flash.ejs",{name : req.session.name, msg : req.flash("success")});
})


// app.get("/reqCount",(req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);
// });

// app.get("/test",(req, res)=>{
//     res.send("testSuccesfull");
// })

// app.get("/",(req, res)=>{
//     req.
// })