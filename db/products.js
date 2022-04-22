const client = require("./client");

const getProductById = (id) => {
  try {
    const { rows: [product] } = await client.query(`
       SELECT * FROM products
       WHERE id=$1;
      `,[id]);
    return product;
  } catch (error) {
    throw error;
  }
}

const getAllProducts = () => {
  try {
    const { rows: productIds } = await client.query(`
           SELECT id FROM products;
           `);

    const products = await Promise.all(
      productIds.map((product) => getProductById(product.id))
    );

    return products;
  } catch (error) {
    throw error;
  }
}

const createProduct = async ({ name, price, quantity, imageUrl }) => {
  try {
    const {
      rows: [product] } = await client.query(
      `
       INSERT INTO products(name, price, quantity,'imageUrl')
       VALUES ($1, $2, $3, $4)
       RETURNING *;     
     `,
      [name, price, quantity, imageUrl]
    );

    return product;
  } catch (error) {
    throw error;
  }
}
  
module.exports = {
  client,
  getProductById,
  getAllProducts,
  createProduct,
};