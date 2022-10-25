const { entries } = require('lodash');
const planModel = require('../Models/planModel');
const reviewModel = require('../Models/reviewModel');

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find();
        if (reviews) {
            res.json({
                msg: "Reviews recieved",
                data: reviews
            });
        }
        else {
            res.json({
                msg: "Reviews not available"
            });
        }
    } catch (error) {
        res.statu(500).send(error);
    }
}

const top3Reviews = async (req, res) => {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);
        if (reviews) {
            res.json({
                msg: "Top 3 reviews found",
                data: top3Reviews
            })
        }
        else {
            res.json({
                msg: "Reviews not found"
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const getPlanReviews = async (req, res) => {
    try {
        let id = req.params.id;
        const review = await reviewModel.findById(id);
        if (review) {
            res.json({
                msg: "Top 3 reviews found",
                data: review
            })
        }
        else {
            res.json({
                msg: "Review not found"
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const createReview = async (req, res) => {
    let id = req.params.plan;
    let plan = await planModel.findById(id);
    let review = await reviewModel.create(req.body);
    plan.reviewCount = plan.reviewCount + 1;
    plan.ratingsAverage = (plan.ratingsAverage + req.body.rating) / plan.reviewCount;
    let planData = await planModel.findByIdAndUpdate(id, plan);
    if (review && planData) {
        res.json({
            msg: "Review done!",
            review: review,
            plan: planData
        })
    }
    else {
        res.json({
            msg: "Review not made"
        })
    }
}

const updateReview = async (req, res) => {
    let id = req.params.id;
    let data = req.body;
    let review = await reviewModel.findByIdAndUpdate(id, data);
    if (review) {
        res.json({
            msg: "Review has been updated successfully",
            data: review
        })
    }
    else {
        res.json({
            msg: "Not updated"
        })
    }
}

const deleteReview = async (req, res) => {
    let id = req.params.id;
    let data = await reviewModel.findByIdAndDelete(id);
    if (data) {
        res.json({
            msg: "Review deleted successfully",
            data: data
        })
    }
    else {
        res.json({
            msg: "Review not deleted"
        })
    }
}

module.exports = {
    getAllReviews: getAllReviews,
    top3Reviews: top3Reviews,
    getPlanReviews: getPlanReviews,
    createReview: createReview,
    updateReview: updateReview,
    deleteReview: deleteReview
}