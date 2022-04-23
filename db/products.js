const client = require("./client");

const getProductById = async (id) => {
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

const getAllProducts = async () => {
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

const createProduct = async ({ name, description, price, imageurl, inStock, category }) => {
  try {
    const {
      rows: [product] } = await client.query(
      `
       INSERT INTO products(name, description, price, imageurl, "inStock", category)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *;     
     `, [name, description, price, imageurl, inStock, category] );

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