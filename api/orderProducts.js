const express = require("express");
const orderProductsRouter = express.Router();

const { updateOrderProduct, destroyOrderProduct, getOrderProductById } = require("../db/orderProducts");
const { getOrderById } = require("../db/orders");
const { requireUser } = require("./utils");
//checkAdmin

orderProductsRouter.patch('/:orderProductId', requireUser, async (req, res, next) => {

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
     const orderProduct = await getOrderProductById(orderProductId);
     const order = await getOrderById(orderProduct.orderId);
     const updatedOrderProduct = await updateOrderProduct({
        id:orderProductId,
        price,
        quantity
     })

     if(order.userId === req.user.id) {
     res.send(updatedOrderProduct)
     } else {
         next({message:"You cannot update this order."})
     }

    } catch (error) {
    throw error;
      }

})


orderProductsRouter.delete('/:orderProductId', requireUser, async (req, res, next) => {
    const { orderProductId } = req.params;
    try {
    const orderProduct = await getOrderProductById(orderProductId);
    const order = await getOrderById(orderProduct.orderId);
    const orderProductToDelete = await destroyOrderProduct();
    if(order.userId === req.user.id) {
        res.send(orderProductToDelete)
    } else {
        ({message:"You cannot delete this order."})
    }
    } catch (error) {
        throw error;
      }

})


module.exports = orderProductsRouter;