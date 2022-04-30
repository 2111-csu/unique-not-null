// will be like routines from fitness tracker

const client = require('./client');

const createOrder = async ({ status = 'created', userId }) => {
  try {
    const { rows: [order] } = await client.query(`
      INSERT INTO orders (status, "userId")
      VALUES ($1, $2)
      RETURNING *;
    `, [status, userId]);
    return order;
  } catch (error) {
    throw error
  };
};

const updateOrder = async ({id, ...fields}) => {

  const setString = Object.keys(fields)
  .map((key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  if (setString.length === 0) {
    return;
  };
  
  try {
    const { rows: [order] } = await client.query(`
      UPDATE orders
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *
    `, Object.values(fields));
    
    return order;
  } catch (error) {
    throw error;
  }
};

const getOrdersByUser = async (username) => {
  try {
    const {rows: orders } = await client.query(`
      SELECT orders.*, users.id, users.username
      FROM users
      JOIN orders ON orders."userId"=users.id
      WHERE users.username=$1;
    `, [username]);

    const {rows: products} = await client.query(`
      SELECT * FROM products
      JOIN order_products ON products.id=order_products."productId"
    `);

    orders.forEach((order) => {
      order.products = products.filter((product) => product.orderId == order.id);
    })
    console.log('order', orders);
    
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

    const {rows: products} = await client.query(`
      SELECT * FROM products
      JOIN order_products ON products.id=order_products."productId"
    `);

    order.products = products.filter((product) => product.orderId == order.id);
    console.log('order', order);
    return order;
  } catch (error) {
    throw error;
  }
};

const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(`
      SELECT * FROM orders;
      `);
      
    const {rows: products} = await client.query(`
      SELECT * FROM products
      JOIN order_products ON products.id=order_products."productId"
    `);

    orders.forEach((order) => {
      order.products = products.filter((product) => product.orderId == order.id);
    })
    console.log('order', orders);
    
    return orders;
  } catch (error) {
    throw error;
  }
};

/*Please check this function*/
const getOrdersByProduct = async({id}) =>  {
  try {
    const { rows: orders } = await client.query(`
      SELECT * FROM orders
      JOIN order_products ON orders.id=order_products."orderId"
      WHERE "productId"=${id}  
      `);
    
    const { rows: products } = await client.query(`
      SELECT * FROM products 
      JOIN order_products ON products.id=order_products."productId"
      `);

    orders.forEach((order) => {
      order.products = products.filter(
        (product) => product.orderId == order.id
      );
    });

    return orders;
  } catch (error) {
    throw error;
  }
};


const getCartByUser = async (userId) =>  {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT * FROM orders
        JOIN users ON orders."userId"=users.id
        WHERE users.id=$1 AND orders.status = 'created';
        `, [userId]
    );

    const {rows: products} = await client.query(`
      SELECT * FROM products
      JOIN order_products ON products.id=order_products."productId"
    `);

    orders.forEach((order) => {
      order.products = products.filter((product) =>
        product.orderId == order.id
      )
    });  
         
     return orders;
  } catch (error) {
    throw error;
  };
};

const cancelOrder = async ({ id, status }) => {
  try {
    const { rows: deletedOrder } = await client.query(`
      UPDATE orders
      WHERE id=$1
      RETURNING ${status === 'canceled'}
    `, [id]);
    return deletedOrder;
  } catch (error) {
    throw error;
  };
};

const completeOrder = async ({ id, status }) => {
  try {
    const { rows: completedOrder } = await client.query(`
      UPDATE orders
      WHERE id=$1
      RETURNING ${status === 'complete'}
    `, [id]);
    return completedOrder;
  } catch (error) {
    console.error(error);
    throw error;
  };
};

module.exports = {
  createOrder,
  updateOrder,
  getOrdersByUser,
  getOrderById,
  getAllOrders,
  getOrdersByProduct,
  getCartByUser,
  cancelOrder,
  updateOrder,
  completeOrder
};


/* Need help with this code

const getCartByUser = ({ userId}) =>  {
  try {
    const { rows: order } = await client.query(
      `
        SELECT orders * FROM orders
        JOIN users ON orders."userId"=users.id
        WHERE id=${userId} AND status="isCreated";
          `,
    );

    const { rows: products } = await client.query(`
         SELECT * FROM products
         JOIN order_products ON products.id=order_products."productId"
         `);

    order.forEach((order) => {
      order.products = order.filter((product) =>
        product.productId == product.id
      )
    });
         
     return orders;
  } catch (error) {
    throw error;
  }
} */