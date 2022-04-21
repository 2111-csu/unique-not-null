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
          username VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL
        );
  
        CREATE TABLE products (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL, 
          price INTEGER NOT NULL  
        );

        CREATE TABLE orders  (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL, 
            total INTEGER NOT NULL 
          );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          'userId' INTEGER REFERENCES users(id),
          'productId' INTEGER REFERENCES products(id),
          comment TEXT NOT NULL,
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

  async function createInitialProducts() {
    try {
      console.log("starting to create products...");
  
      const productsToCreate = [
        {
          name: "productOne",
          price: 5,
        },
        {
          name: "productTwo",
          price: 10,
        },
        {
          name: "productThree",
          price: 15,
        },
        {
          name: "productFour",
          price: 20,
        },
        {
          name: "productFive",
          price: 25,
        },
        {
          name: "productSix",
          price: 50,
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

  async function rebuildDB() {
    try {
      client.connect();
      await dropTables();
      await createTables();
      await createInitialUsers();
      await createInitialProducts();
    //   await createInitialOrders();
    //   await createInitialReviews();
    } catch (error) {
      console.log("Error during rebuildDB");
      throw error;
    }
  }
  
  module.exports = {
    rebuildDB,
  };
