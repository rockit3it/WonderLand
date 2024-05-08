const Listing = require("./models/listing");
const Review = require("./models/review");
const {listingSchema, reviewSchema} = require("./schema");
module.exports.isLoggedIn = (req, res, next) => {
    // console.log(res);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must logged in first!");
    return res.redirect("/login");
  } else {
    next();
  }
};

module.exports.savedSession = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  if (!res.locals.currUser) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "User not logged in");
    return res.redirect("/login");
  }
  if (listing && !listing.owner.equals(res.locals.currUser._id)) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Permission denied");
    return res.redirect("/listings");
  } else {
    next();
  }
};


module.exports.validateListing = (req, res, next) => {
  let {result} = listingSchema.validate(req.body);
  if(result){
          throw new ExpressError(400, result.error);
  }
  else{
      next();
  }
}


module.exports.validateReview = (req, res, next) => {
  let {error} = reviewSchema.validate(req.body);
  if(error){
      throw new ExpressError(400, result, error);
  }
  else{
      next();
  }
}

module.exports.isreviewAuthor = async (req, res, next) => {
  const { id , reviewId} = req.params;
  let review = await Review.findById(reviewId);
  console.log(review.author);
  if (review && !review.author.equals(res.locals.currUser._id)) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Permission denied");
    return res.redirect(`/listings/${id}`);
  } else {
    next();
  }
};