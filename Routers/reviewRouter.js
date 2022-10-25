const express = require('express');
const { protectRoute } = require('../Controllers/authController');
const reviewRouter = express.Router();
const {getAllReviews, top3Reviews, getPlanReviews, createReview, updateReview, deleteReview} = require('../Controllers/reviewController');

reviewRouter
    .route('/reviews')
    .get(getAllReviews)

reviewRouter
    .route('/top3')
    .get(top3Reviews)

reviewRouter
    .route('/:id')
    .get(getPlanReviews)

reviewRouter.use(protectRoute);
reviewRouter
    .route('/:plan')
    .post(createReview)

reviewRouter
    .route('/:id')
    .patch(updateReview)
    .delete(deleteReview)

module.exports = reviewRouter;