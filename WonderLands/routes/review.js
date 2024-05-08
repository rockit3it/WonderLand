const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {isLoggedIn, isOwner, validateReview, isreviewAuthor } =  require("../middleware");
const reviewController = require("../controllers/review.js");
// to validate and show the reviews
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.create));


//route for deleting of reviews
router.delete("/:reviewId", isLoggedIn,isreviewAuthor,wrapAsync(reviewController.destroyreview));


module.exports = router;