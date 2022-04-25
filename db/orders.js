// will be like routines from fitness tracker

const client = require('./client');

const createOrder = async ({ name, total, userId, productId }) => {
  try {
    const { rows: [order] } = await client.query(`
      INSERT INTO orders (name, total, 'userId',  'productId')
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [name, total, userId, productId]);

    return order;
  } catch (error) {
    throw error
  };
};

const updateOrder = async ({id, ...fields}) => {

  const setString = Object.keys(fields)
  .map((key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');
  
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));
    
    return order;
  } catch (error) {
    throw error;
  }
};

const getOrdersByUser = async (user) => {
  try {
    const {rows: orders } = await client.query(`
      SELECT orders.*, username
      FROM users
      JOIN orders ON orders."userId"=users.id
      WHERE users.id=$1;
    `, [user.id]);

      // I dont think we need below to get the products if we put them in an array in the table
    // const {rows: products} = await client.query(`
    //   SELECT * 
    //   FROM products
    //   JOIN routine_activities ON activities.id=routine_activities."activityId"
    // `);
     // wont need this either
    // routines.forEach((routine) => {
    //   routine.activities = activities.filter((activity) => activity.routineId == routine.id);
    // });
    
    return orders;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (id) => {
  try {
    const { rows: [order] } = await client.query(`
       SELECT * FROM orders
       WHERE id=$1;
      `,[id]);
    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const { rows: orderIds } = await client.query(`
           SELECT id FROM products;
           `);

    const orders = await Promise.all(
      orderIds.map((order) => getOrderById(order.id))
    );

    return orders;
  } catch (error) {
    throw error;
  }
}

/*Please check this function*/
const getOrdersByProduct = async({id}) =>  {
  try {
    const { rows: orders } = await client.query(`
        SELECT orders.*, users.username AS "creatorName"
         FROM ORDERS
        JOIN order_products ON orders.id=order_products."orderId"
        WHERE "productId"=${id}  
        `);

    const { rows: products } = await client.query(`
       SELECT * FROM products 
       JOIN order_products ON products.id=order_products."productId"
       `);

    orders.forEach((order) => {
      order.products = products.filter(
        (product) => product.productId == product.id
      );
    });

    return orders;
  } catch (error) {
    throw error;
  }
};



module.exports = {
  createOrder,
  updateOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  getOrdersByProduct
  //getCartByUser
};


/* Need help with this code

const getCartByUser = ({ username }) =>  {
  try {
    const { rows: order } = await client.query(
      `
        SELECT orders.*, users.username AS "creatorName"
        FROM orders
        JOIN users ON orders."userId"=users.id
        WHERE username=$1 AND status = "isCreated";
          `,
      [username]
    );

    const { rows: products } = await client.query(`
         SELECT * FROM products
         JOIN order_products ON products.id=order_products."productId"
         `);

    order.products = products.filter(product => product.id == product.productId)
         
     return order;
  } catch (error) {
    throw error;
  }
} */