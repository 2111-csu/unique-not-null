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
    const { rows } = await client.query(`
      SELECT * FROM orders;
      `);
      return rows;
  } catch (error) {
    throw error;
  };
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
        (product) => product.orderId == orderid
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