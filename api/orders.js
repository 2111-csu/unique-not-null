const express = require("express");
const ordersRouter = express.Router();



const { getAllOrders, createOrder, getCartByUser, updateOrder, getOrderById } = require("../db/orders");
const { addProductToOrder } = require('../db/orderProducts');
const { requireUser, checkAdmin } = require("./utils");
const { cancelOrder } = require('../db/orders.js');

/*GET return a list of orders in the database, need admin, how about requireAdmin function?*/
ordersRouter.get("/", requireUser, async (req, res, next) => {
    
    try {
      if (checkAdmin) {
        const orders = await getAllOrders();
        res.send(orders);
      } else {
        res.send({
          error: "AdminError",
          message: "You must be an Admin to access that"
        })
      }
      
    } catch (error) {
      throw error;
    }
  });


/*POST Create a new order*/
ordersRouter.post("/", requireUser, async (req, res, next) => {
    const { status } = req.body;
    const { id } = req.user;

    try {
      const order = await createOrder({
        status,
        userId: id
      });
      
      console.log('placed Order,', order);
      res.send({
        userId: id,
        status,
      });
    } catch (error) {
      throw error;
    }
  });

ordersRouter.get('/cart', requireUser, async (req, res, next) => {
    const { id } = req.user;

    try {

      const userCart = await getCartByUser(id)
      res.send(userCart)
    }
  
    catch (error) {
      throw error;
    };
});

ordersRouter.get("/:orderId", async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const order = await getOrderById(orderId);
    console.log(order, "Order from ordersRouter.get");
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

  ordersRouter.delete('/:orderId', async (req, res, next) => {
    try {
      console.log(req.body)
      const id = req.params.id;
      const deletedOrder = await cancelOrder(id);
      res.send(deletedOrder);
    } catch (error) {
      return next(error);
    };
  });


  ordersRouter.patch('/:orderId', requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;
    try {
      const updatedOrder = await updateOrder(orderId, { status });
      res.send({
        updatedOrder: updatedOrder
      });
    } catch (error) {
      throw (error);
    };
  });

  /*add a single product to an order, if product already exists increment quantity, update price */
  ordersRouter.post('/:orderId/products', requireUser, async (req, res, next) => {
    const { productId, price, quantity } = req.body;
    const { orderId } = req.params;

    if(quantity) { 
      quantity = quantity++
    } 

    try {
      const orderProduct = await addProductToOrder({
        orderId,
        productId,
        price,
        quantity
      });
      res.send(orderProduct);
    } catch (error) {
        throw error;
      }
});

module.exports = ordersRouter;