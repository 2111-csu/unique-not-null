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

module.exports = {
    createReview,
    updateReview,
    deleteReview,
};