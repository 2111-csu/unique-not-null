const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct, //do we need this, is this in db, yes check
  destroyProduct  //do we need this? is this in db, yes check
} = require("../db");
const { getAllOrders, getOrdersByProduct } = require("../db/orders");

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

    if(checkAdmin) {
    const product = await createProduct({ name, description, price, imageUrl, inStock, category });

    res.send({
      id: product.id,
      name,
      description,
      price,
      imageUrl,
      inStock,
      category
    });
  } else {
    res.send({
      error:"AdminError",
      message: "You must be an Admin to create a product."
    })
  }
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


/*UPDATE, only admins can update */

productsRouter.patch("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { name, price } = req.body;

  try {
    if(checkAdmin) {
    const updatedProduct = await updateProduct({
      id: productId,
      name,
      price,
    });

    res.send(updatedProduct);
  } else {
    res.send({
      error:'AdminError',
      message: 'You must be an admin to update a product.'
    })
  }
  } catch (error) {
    throw error;
  }
});

/*DELETE, only admins can delete a product */

productsRouter.delete("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;

  try {

    if(checkAdmin) {
    const product = await destroyProduct(productId);
    res.send(product);
    } else {
      res.send ({
        error:'AdminError',
        message: 'You must be an admin to delete a product.'
      })
    }
  } catch (error) {
    next(error);
  }
}); 

productsRouter.get("/:productId/orders", requireUser, async (req, res, next) => {
    const { productId } = req.params;
  try {

    if(checkAdmin) {
      const orders = await getOrdersByProduct(productId);
      res.send(orders);
    } else {
      res.send({
        error: 'AdminError',
        message: 'You must be an admin to get orders.'
      })
    }
  }
      catch (error) {
      next(error);
    }
});

module.exports = productsRouter;
