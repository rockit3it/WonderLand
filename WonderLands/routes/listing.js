const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
router.get("/new",isLoggedIn, listingController.create);
router.get("/:id/delete", isOwner,isLoggedIn,wrapAsync(listingController.destroy));
router.get("/:id/edit", isOwner,isLoggedIn,wrapAsync(listingController.edit));
router.route("/")
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing,wrapAsync(listingController.save));
    .post(upload.single("listing[image]"), (req, res) => {
        res.send(req.file); // automatically uplods named folder is created and saved inside that folder
    })

router.route("/:id")
    .get(wrapAsync(listingController.show))
    .put(isOwner,validateListing,wrapAsync(listingController.update));

module.exports = router;