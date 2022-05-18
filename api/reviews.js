const express = require('express');
const reviewsRouter = express.Router();
const {
    createReview,
    updateReview,
    getReviewsById,
    getAllReviews
} = require('../db');
const { requireUser } = require('./utils');

reviewsRouter.post('/', requireUser, async (req, res, next) => {
    const {
        userId,
        title,
        content = "",
        stars,
        productId

    } = req.body;
    let reviewInfo = {};

    try {
        reviewInfo.userId = userId;
        reviewInfo.title = title;
        reviewInfo.content = content;
        reviewInfo.stars = stars;
        reviewInfo.productId = productId;

        const review = await createReview(reviewInfo);

        if (review) {
            res.send({review});
        } else {
            next();
        }
    } catch (error) {
        next (error);
    };
});

reviewsRouter.get('/', async (req, res) => {
    try {
        const allReviews = await getAllReviews();

        const reviews = allReviews.filter((review) => {
            return ((review.active && review.author.active) || (req.user && review.author.id === req.user.id));
        });
        res.send({reviews});
    } catch (error) {
        next (error);
    }
});

reviewsRouter.delete('/:reviewId', requireUser, async (req, res, next) => {
    try {
        const review = await getReviewsById(req.params.reviewId);

        if (review && review.author.id === req.user.id) {
            const updatedReviews = await updateReview(review.id, {active: false});
            res.send ({review: updateReview});
        } else {
            next (post ? {
                name: 'unauthorizedError',
                message: 'You can only delete or edit reviews you have written'
            } : {
                name: 'nonexistentReviewError',
                message: 'That review does not exist'
            });
        }
    }catch (error) {
        throw error;
    };
});

module.exports = reviewsRouter;