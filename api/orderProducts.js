const express = require("express");
const orderProductsRouter = express.Router();

const { updateOrderProduct, destroyOrderProduct } = require("../db/orderProducts");

orderProductsRouter.patch('/:orderProductId', async (req, res, next) => {
    const { orderProductId } = req.params;
    const { price, quantity } = req.body;
    const updateFields = {};

    if(price) {
        updateFields.price = price;
    }
    if(quantity) {
        updateFields.quantity = quantity
    }

    try {
      const updatedOrderProduct = await updateOrderProduct({
        id: orderProductId,
        quantity
      });
      console.log('updatedOrderProduct,',updatedOrderProduct);
      return {message: "Product Quantity Updated"}
    } catch (error) {
      throw error;
    }

})

orderProductsRouter.delete('/:orderProductId', async (req, res, next) => {
  const { orderProductId } = req.params;
    try {
      const orderProductToDelete = await destroyOrderProduct(orderProductId);
      console.log('orderProductToDelete', orderProductToDelete);
 
    } catch (error) {
      throw error;
    }

})

module.exports = orderProductsRouter;