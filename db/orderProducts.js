const client = require('./client');

const getOrderProductById = async (id) => {
    try {
        const { rows: orderProduct } = await client.query(`
            SELECT *
            FROM order_products
            WHERE id=$1;
        `, [id]);
        return orderProduct;
    } catch (error) {
        throw error;
    };
};

const addProductToOrder = async ({orderId, productId, price, quantity}) => {
    try {
        const { rows: [orderProduct] } = await client.query(`
            INSERT INTO order_products ("orderId", "productId", price, quantity)
            VALUES($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO NOTHING
            RETURNING *
        `, [orderId, productId, price, quantity]);
        return orderProduct;
    } catch (error) {
        console.log('error', error);
        throw error;
    };
};

// const updateOrderProduct = async ({ id, price, quantity }) => {
//     try {
//         let temp = getOrderProductById(id);
//         price = price ? price: temp.price;
//         quantity = quantity ? quantity: temp.quantity;
//         const { row } = await client.query(`
//             UPDATE order_products
//             SET price=$1, quantity=$2
//             WHERE id=$3
//         `, [id, price, quantity]);
//         return row;
//     } catch (error) {
//         throw error;
//     };
// };

const updateOrderProduct = async ({id, ...fields}) => {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    try {
        const { rows: [orderProduct] } = await client.query(`
            UPDATE order_products
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
        `, Object.values(fields));
        return {message: "Product Quantity Updated"};
    } catch (error) {
        throw error;
    };
};

const destroyOrderProduct = async (id) => {
    try {
        const { rows: [deletedOrderProduct] } = await client.query(`
            DELETE FROM order_products
            WHERE id=$1
        `, [id]);
        return deletedOrderProduct;
    } catch (error) {
        throw error;
    };
};

module.exports = {
    getOrderProductById,
    addProductToOrder,
    updateOrderProduct,
    destroyOrderProduct
};