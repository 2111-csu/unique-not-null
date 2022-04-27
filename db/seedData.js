const client = require('./client')
const { createUser } = require("./users");
const { createProduct, getAllProducts} = require("./products")
const { createOrder, getAllOrders } = require('./orders');
const { createReview } = require ('./reviews');

const dropTables = async () => {
    try {
      console.log("Dropping All Tables...");
      await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS products;
    `);
  
      console.log("Finished dropping tables!");
    } catch (error) {
      console.error("Error dropping tables!");
      throw error;
    }
}

const createTables = async () => {
    try {
      console.log("Starting to build tables...");
 
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY, 
          "firstName" VARCHAR(255) NOT NULL,
          "lastName" VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          imageurl TEXT DEFAULT 'https://picsum.photos/id/1080/400/300',
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false
        );
  
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL, 
          description TEXT NOT NULL,
          price NUMERIC NOT NULL,
          imageurl TEXT DEFAULT 'https://picsum.photos/id/1080/400/300',
          "inStock" BOOLEAN DEFAULT false,
          category VARCHAR(255) NOT NULL
        );

        CREATE TABLE orders  (
          id SERIAL PRIMARY KEY,
          status TEXT NOT NULL,
          "userId" INTEGER REFERENCES users(id),
          "datePlaced"  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id)
        );

        CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price NUMERIC NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0
        );
  
      `);
  
      console.log("Finished building tables!");
    } catch (error) {
      console.error("Error building tables!");
      throw error;
    }
  }

  const createInitialUsers = async () => {
    console.log("Starting to create users...");
    try {
      const usersToCreate = [
        { firstName: 'Nick', lastName: 'Mullen', Username: 'Sprocket', password: '123456789', email: '25nmullen@gmail.com', isAdmin: true },
        { firstName: 'Marisa', lastName: 'Fontana', Username: 'marisapf', password: 'marisa22', email:'marisaonthego@gmail.com' , isAdmin: true },
        { firstName: 'David', lastName: 'Willis', Username: 'spinnerfall', password: 'Cruce$31', email: 'dafewillis@gmail.com', isAdmin: true },
      ];
      const users = await Promise.all(usersToCreate.map(createUser));
  
      console.log("Users created:");
      console.log(users);
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    };
  };

const createInitialProducts = async () => {
    console.log("starting to create products...");
    try {
      const productsToCreate = [
        {
          name: "productOne",
          price: 5,
          description: 'desc 1',
          imageurl: 'https://picsum.photos/id/1023/400/300',
          category: 'type 1'
        },
        {
          name: "productTwo",
          price: 10,
          description: 'desc 1',
          imageurl: 'https://picsum.photos/id/1028/400/300',
          category: 'type 2'
        },
        {
          name: "productThree",
          price: 15,
          description: 'desc 1',
          imageurl: 'https://picsum.photos/id/1027/400/300',
          category: 'type 3'
        },
        {
          name: "productFour",
          price: 20,
          description: 'desc 1',
          imageurl: 'https://picsum.photos/id/1026/400/300',
          category: 'type 4'
        },
        {
          name: "productFive",
          price: 25,
          description: 'desc 1',
          imageurl: 'https://picsum.photos/id/1025/400/300',
          category: 'type 5'
        },
        {
          name: "productSix",
          price: 50,
          description: 'desc 1',
          imageurl: 'https://picsum.photos/id/1024/400/300',
          category: 'type 6'
        },
      ];
      const products = await Promise.all(
        productsToCreate.map((product) => createProduct(product))
      );
      console.log("Products Created: ", products);
      console.log("Finished creating products.");
    } catch (error) {
      throw error;
    }
  }

  const createInitialOrders = async () => {
    console.log('starting to create orders...');
    try {
      const ordersToCreate = [
        {userId: 1, status: 'created'},
        {userId: 2, status: 'canceled'},
        {userId: 3, status: 'completed'},
      ]
        const orders = await Promise.all(
          ordersToCreate.map((order) => createOrder(order))
        );
        console.log('Orders Created: ', orders);
        console.log('Finished creating products.');
    } catch(error) {
      throw error;
    };
  };

  const createInitialOrderProducts = async () => {
    console.log('starting to create orderProducts...')
    try {
      const orderProductstoCreate = [
        {orderId: 1, productId: 1, price: 5, quantity: 2},
        {orderId: 2, productId: 2, price: 10, quantity: 3},
        {orderId: 1, productId: 3, price: 15, quantity: 3},
        {orderId: 2, productId: 4, price: 20, quantity: 1},
        {orderId: 3, productId: 5, price: 25, quantity: 2},
        {orderId: 3, productId: 6, price: 50, quantity: 1},
      ]
        const orderProducts = await Promise.all(
          orderProductstoCreate.map((orderProduct) => addProductToOrder(orderProduct))
        );
        console.log('OrderProducts Created: ', orderProducts);
        console.log('Finished creating orderProducts.')
    }catch(error) {
      throw error;
    };
  };

  const createInitialReviews = async () => {
    console.log('starting to create reviews...');
    try {
      const reviewsToCreate = [
        {comment: 'Wow this stuff is delicious!'},
        {comment: 'I just cannot stop eating it!'},
        {comment: 'I love the Classic Cracker Jack flavor, but my dog loves it even more.'},
        {comment: 'Pure popcorn perfection.'},
      ]
        const reviews = await Promise.all(
          reviewsToCreate.map((review) => createReview(review))
        );
        console.log('Reviews Created: ', reviews);
        console.log('Finished creating reviews.')
    } catch (error) {
      throw error;
    };
  };

  async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialProducts();
      await createInitialOrders();
      await createInitialOrderProducts();
      await createInitialReviews();
    } catch (error) {
      console.log("Error during rebuildDB");
      throw error;
    }
  }
  
  module.exports = {
    rebuildDB,
  };
