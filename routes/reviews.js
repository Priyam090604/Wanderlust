const express = require("express");
const router = express.Router({mergeParams:true});


const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError");
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");




//Reviews
//post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview)
);

//Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor, //IMPORTANT
  wrapAsync(reviewController.deleteReview)
);

module.exports = router;