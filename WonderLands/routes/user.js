const express = require("express");
const app = express();
const router = express.Router({mergeParams : true});
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {savedSession} =  require("../middleware");
const userController = require("../controllers/user");
router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.post));



router.get("/login",userController.renderLoginForm);

router.post("/login", savedSession
    ,passport.authenticate("local", { 
        failureRedirect: "/login", 
        failureFlash: true 
    }),
    userController.login
);
router.get("/logout", userController.logout);
 module.exports = router;