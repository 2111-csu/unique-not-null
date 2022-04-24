const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  //updateProduct, //do we need this, is this in db
  //deleteProduct  //do we need this? is this in db
} = require("../db");

const { requireUser } = require("./utils");

/*GET return a list of products in the database*/
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    throw error;
  }
});

/*POST Create a new product*/
productsRouter.post("/", requireUser, async (req, res, next) => {
  const { name, price, imageUrl } = req.body;
  try {
    const product = await createProduct({ name, price, imageUrl });

    res.send({
      id: product.id,
      name,
      price,
      imageUrl
    });
  } catch (error) {
    throw error;
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    throw error;
  }
});

/*UPDATE Do we need this? only to update the price or name? this function not in db

productsRouter.patch("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { name, price } = req.body;

  try {
    const updatedProduct = await updateProduct({
      id: productId,
      name,
      price,
    });

    res.send(updatedProduct);
  } catch (error) {
    throw error;
  }
});

Do we need this? this function does not exist in db

productsRouter.delete("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await deleteProduct(productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
}); */


module.exports = productsRouter;
