const express = require("express");
const ordersRouter = express.Router();

const { getAllOrders, createOrder } = require("../db/orders");
const { requireUser } = require("./utils");

/*GET return a list of orders in the database, need admin, how about requireAdmin function?*/
ordersRouter.get("/", async (req, res, next) => {
    try {
      const orders = await getAllOrders();
      res.send(orders);
    } catch (error) {
      throw error;
    }
  });

/*POST Create a new order*/
ordersRouter.post("/", requireUser, async (req, res, next) => {
    const { name, total, userId, productId} = req.body;
    try {
      const order = await createOrder(req.body);
  
      res.send({
        id:order.id,
        name,
        total,
        userId,
        productId
      });
    } catch (error) {
      throw error;
    }
  });

module.exports = ordersRouter;