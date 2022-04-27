const express = require("express");
const ordersRouter = express.Router();

const { getAllOrders, createOrder } = require("../db/orders");
const { requireUser, checkAdmin } = require("./utils");

/*GET return a list of orders in the database, need admin, how about requireAdmin function?*/
ordersRouter.get("/", requireUser, async (req, res, next) => {
    try {
      if (checkAdmin(req.user)) {
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
    const { userId, status} = req.body;
    try {
      const order = await createOrder(req.body);
  
      res.send({
        userId,
        status
      });
    } catch (error) {
      throw error;
    }
  });

module.exports = ordersRouter;