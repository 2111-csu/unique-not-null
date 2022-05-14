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
    const { rows: products } = await client.query(`
           SELECT * FROM products;
           `);

    const {rows: reviews } = await client.query(`
           SELECT * FROM reviews
           JOIN products ON products.id=reviews."productId"
         `);
     
         products.forEach((product) => {
           product.reviews = reviews.filter((review) => review.productId == product.id);
         })
         console.log('products', products);

    return products;
  } catch (error) {
    throw error;
  }
}

const createProduct = async ({ name, description, price, imageurl, inStock = false, category }) => {
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

const updateProduct = async ({id, ...fields}) => {
  const setString = Object.keys(fields).map(
      (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  try {
      const { rows: [product] } = await client.query(`
          UPDATE products
          SET ${ setString }
          WHERE id=${ id }
          RETURNING *;
      `, Object.values(fields));
      console.log(product);
      return {message: "Product Updated"};
  } catch (error) {
      throw error;
  };
};


const destroyProduct = async (id) => {
  try {
    await client.query(`
        DELETE FROM order_products 
        WHERE "productId" = $1;
    `, [id]);
    await client.query(`
        DELETE FROM reviews
        WHERE "productId" = $1;
    `, [id]);
    const { rows: [deletedProduct] } = await client.query(`
      DELETE FROM products 
      WHERE id=${id}
    `);
    return deletedProduct;
    } catch (error){
      throw error;
    };
};
  
module.exports = {
  client,
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  destroyProduct
};