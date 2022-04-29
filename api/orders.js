const express = require("express");
const ordersRouter = express.Router();

const { getAllOrders, createOrder, getCartByUser } = require("../db/orders");
const { requireUser, checkAdmin } = require("./utils");

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
        userId:id
      });
      
      console.log('placed Order,', order);
      res.send({
        userId,
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
      }
  })

module.exports = ordersRouter;