const User = require("../models/user");
module.exports.renderSignupForm = (req, res) =>{
    res.render("./user/signUp.ejs");
};

module.exports.post = async(req, res)=>{
    try{
        let {username, email ,password} = req.body.user;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password); 
        console.log(registeredUser);
        req.login(registeredUser, (err, next)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Sign up successful");
            res.redirect("/listings");
        })
        
    }
    catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLoginForm = (req, res)=>{
    res.render("./user/login.ejs");
}


module.exports.login = async (req, res) => {
    req.flash("success", "login succesful");
    if(res.locals.redirectUrl){
        res.redirect(res.locals.redirectUrl);
    }
    else{
        res.redirect("/listings");
    }
    // console.log(res);
}

module.exports.logout = (req, res, next)=> {
    req.logOut((err,next)=>{
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
    
};