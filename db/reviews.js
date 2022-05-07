const client = require('./client');

const createReview = async ({ title, content, stars, userId, productId }) => {
    try {
        const { rows: [review] } = await client.query(`
            INSERT INTO reviews (title, content, stars, "userId", "productId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, content, stars, userId, productId]);
        return review;
    } catch (error) {
        console.error("Could not create review...", error);
    };
};

const updateReview = async ({ id, ...fields }) => {
    
    const setString = Object.keys(fields).map((key, index) => `"${ key }"=$${ index + 1 }`).join(', ');

    if (setString.length === 0) {
        return;
    };

    try {
        const { rows: [review] } = await client.query(`
            UPDATE orders
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));

        return review;
    } catch (error) {
        throw error;
    };
};

const deleteReview = async(id) => {
    try {
        const { rows: [review] } = await client.query(`
            DELETE FROM reviews
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return review;
    } catch (error) {
        console.error("Could not delete review...", error)
    };
};

const getReviewsById = async() => {
    try {
        const { rows: [reviews] } = await client.query(`
            SELECT * FROM users
            WHERE id=$1
        `, [id]);
        return reviews;
    } catch (error) {
        throw error;
    };
};

const getAllReviews = async() => {
    try {
        const { rows: [reviews] } = await client.query(`
            SELECT * FROM reviews
        `);
        return reviews;
    } catch (error) {
        throw error;
    };
};

const getReviewsByProductId = async(productId) => {
    try {
        const { rows: [reviewsByProductId] } = await client.query(`
            SELECT * FROM reviews
            WHERE "productId"=$1
        `, [productId]);
        return reviewsByProductId
    } catch (error) {
        throw error;
    };
};

const getReviewsByUserId = async(userId) => {
    try {
        const { rows: [reviewsByUserId] } = await client.query(`
            SELECT * FROM reviews
            WHERE "userId"=$1
        `, [userId]);
        return reviewsByUserId;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getReviewsById,
    getAllReviews,
    getReviewsByProductId,
    getReviewsByUserId
};