if(process.env.NODE_ENV != "production") { // to stop the .env file to host on other hosting platform
  require("dotenv").config();
}
const express = require("express");
const app = express();
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const mongoose = require("mongoose");
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
const ejs = require("ejs");
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const cookie = require("cookie");
const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const User = require("./models/user.js");
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(methodOverride("_method"));
const MONGO_URL = "mongodb://127.0.0.1:27017/haweli";
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
// to use static files with out project
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const port = 3000;
app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
//for using sessions

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
//passport also uses the sessions for remembring the current user for page to page
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// app.use("/demoUser", async(req, res)=>{
//     let fakeUser = new User({
//         email : "ritesh1234@gmail.com",
//         username : " ritesh",
//     })
//     let registeredUser = await User.register(fakeUser, "hello");
//     res.send(registeredUser);
// })
//for listings route
app.use("/listings", listingsRouter);
//for reviews route
app.use("/listings/:id/reviews", reviewsRouter);
// for sign up or sign in related routes
app.use("/", userRouter);
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found"));
});
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "something Went Wrong" } = err;
  res.status(statusCode).render("listings/error.ejs", { statusCode, message });
});
