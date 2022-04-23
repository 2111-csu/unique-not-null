const { createUser } = require("./users");
const { createProduct, getAllProducts} = require("./products")
const { createOrder, getAllOrders } = require('./orders');
const { createReview } = require ('./reviews');

const dropTables = async () => {
    try {
      console.log("Dropping All Tables...");
      await client.query(`
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
          "imageURL" TEXT DEFAULT 'https://picsum.photos/id/1080/400/300',
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" VARCHAR(255) NOT NULL DEFAULT false
        );
  
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL, 
          description TEXT NOT NULL,
          price NUMERIC NOT NULL,
          "imageUrl" TEXT DEFAULT 'https://picsum.photos/id/1080/400/300',
          "inStock" BOOLEAN DEFAULT false,
          category VARCHAR(255) NOT NULL
        );

        CREATE TABLE orders  (
            id SERIAL PRIMARY KEY,
            status DEFAULT created,
            "userId" INTEGER REFERENCES users(id),
            "datePlaced" DATE
          );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
          comments TEXT ARRAY
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
        { username: "Nick", password: "nick12345" },
        { username: "Marisa", password: "marisa12345" },
        { username: "David", password: "david12345" },
        { username: "admin", password: "admin12345"},
      ];
      const users = await Promise.all(usersToCreate.map(createUser));
  
      console.log("Users created:");
      console.log(users);
      console.log("Finished creating users!");
    } catch (error) {
      console.error("Error creating users!");
      throw error;
    }
  }

const createInitialProducts = async () => {
    console.log("starting to create products...");
    try {
      const productsToCreate = [
        {
          name: "productOne",
          price: 5,
          description: 'desc 1',
          imageUrl: 'https://picsum.photos/id/1023/400/300',
          category: 'type 1'
        },
        {
          name: "productTwo",
          price: 10,
          description: 'desc 1',
          imageUrl: 'https://picsum.photos/id/1028/400/300',
          category: 'type 2'
        },
        {
          name: "productThree",
          price: 15,
          description: 'desc 1',
          imageUrl: 'https://picsum.photos/id/1027/400/300',
          category: 'type 3'
        },
        {
          name: "productFour",
          price: 20,
          description: 'desc 1',
          imageUrl: 'https://picsum.photos/id/1026/400/300',
          category: 'type 4'
        },
        {
          name: "productFive",
          price: 25,
          description: 'desc 1',
          imageUrl: 'https://picsum.photos/id/1025/400/300',
          category: 'type 5'
        },
        {
          name: "productSix",
          price: 50,
          description: 'desc 1',
          imageUrl: 'https://picsum.photos/id/1024/400/300',
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
        {product: 'Butter Toffee Popcorn', quantity: 5, total: 40},
        {product: 'Chocolate Drizzle Popcorn', quantity: 10, total: 80},
        {product: 'Butter Praline Popcorn', quantity: 3, total: 24},
        {product: 'Classic Cracker Jack Popcorn', quantity: 7, total: 56},
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
      // await createInitialOrders();
      // await createInitialReviews();
    } catch (error) {
      console.log("Error during rebuildDB");
      throw error;
    }
  }
  
  module.exports = {
    rebuildDB,
  };
