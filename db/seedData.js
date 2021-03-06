const client = require('./client')
const { createUser } = require("./users");
const { createProduct, getAllProducts} = require("./products")
const { addProductToOrder} = require('./orderProducts')
const { createOrder, getAllOrders } = require('./orders');
const { createReview } = require ('./reviews');

const dropTables = async () => {
    try {
      console.log("Dropping All Tables...");
      await client.query(`
      DROP TABLE IF EXISTS order_products;
      DROP TABLE IF EXISTS reviews;
      DROP TABLE IF EXISTS orders;
      DROP TABLE IF EXISTS products;
      DROP TABLE IF EXISTS users;
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
          "datePlaced" DATE DEFAULT CURRENT_DATE
        );
        
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          content VARCHAR(255) NOT NULL,
          stars INTEGER DEFAULT NULL,
          "userId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id)
        );

        CREATE TABLE order_products (
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "orderId" INTEGER REFERENCES orders(id),
          price NUMERIC NOT NULL,
          quantity INTEGER NOT NULL DEFAULT 0,
          UNIQUE ("orderId", "productId")
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
        { 
          firstName: 'Nick', 
          lastName: 'Mullen', 
          username: 'Sprocket', 
          password: '123456789', 
          email: '25nmullen@gmail.com', 
          isAdmin: true 
        },
        { 
          firstName: 'Marisa', 
          lastName: 'Fontana', 
          username: 'marisapf', 
          password: 'marisa22', 
          email:'marisaonthego@gmail.com',
          isAdmin: true 
        },
        { 
          firstName: 'David', 
          lastName: 'Willis', 
          username: 'spinnerfall', 
          password: 'Cruce$31', 
          email: 'dafewillis@gmail.com', 
          isAdmin: true 
        },
        { 
          firstName: 'Katie', 
          lastName: 'Mullen', 
          username: 'Lily',
          password: '123456789', 
          email: 'tigergrl25@gmail.com', 
          isAdmin: false 
        },
        { 
          firstName: 'Jenn', 
          lastName: 'Jones', 
          username: 'Birch',
          password: '123456789', 
          email: 'jjonessteamboat@gmail.com', 
          isAdmin: false 
        },
        { 
          firstName: 'Bennett', 
          lastName: 'Willis', 
          username: 'ScooterKid',
          password: '123456789', 
          email: 'bemersonw@gmail.com', 
          isAdmin: false 
        },
        { 
          firstName: 'Elena', 
          lastName: 'Quarles', 
          username: 'ellenq',
          password: '123456789', 
          email: 'fakeemail@gmail.com', 
          isAdmin: false 
        },
        { 
          firstName: 'Tim', 
          lastName: 'Potten', 
          username: 'dorkface',
          password: '123456789', 
          email: 'timpotten@gmail.com', 
          isAdmin: false 
        },
        { 
          firstName: 'Jaime', 
          lastName: 'Meline', 
          username: 'el-p',
          password: '123456789', 
          email: 'runthejewels@gmail.com', 
          isAdmin: false 
        },
        { 
          firstName: 'Jeff', 
          lastName: 'Tweedy', 
          username: 'wilco',
          password: '123456789', 
          email: 'wilcoband@gmail.com', 
          isAdmin: false 
        }
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
          name: "Colorado Kettle Corn",
          price: 8,
          description: 'A sublime blend of savory and sweet, this kettle corn concoction will keep you munching until it disappears.',
          imageurl: 'https://www.foodlovinfamily.com/wp-content/uploads/2020/07/Kettle-corn-main-square.jpg',
          category: 'Sweet & Savory'
        },
        {
          name: "Peanut Butter Choco-corn",
          price: 10,
          description: 'What else can you say about chocolate and peanut butter together? A stone cold classic.',
          imageurl: 'https://thelemonbowl.com/wp-content/uploads/2018/03/Peanut-Butter-Chocolate-Drizzled-Popcorn-1-500x375.jpg',
          category: 'Sweet'
        },
        {
          name: "Windy City Chicago Style",
          price: 10,
          description: 'Cheddar popcorn and caramel corn together? What?!? Yes, this Chicago combo is delicious.',
          imageurl: 'https://boodlesofpopcorn.com/wp-content/uploads/sites/4/2018/01/chicago-style600.jpg',
          category: 'Sweet & Savory'
        },
        {
          name: "Elote Street Corn",
          price: 12,
          description: 'The perfect salty snack after you knock a few cervezas back.',
          imageurl: 'https://lacooquette.com/wp-content/uploads/2016/02/flavored-popcorn-5-ways-elote-la-cooquette.jpg',
          category: 'Savory'
        },
        {
          name: "JaPopcorn",
          price: 12,
          description: 'A delicious swirl of soy sauce, sesame, rice vinegar, roasted nori and wasabi. Unbelievable umami in every bite.',
          imageurl: 'https://www.lacrema.com/wp-content/uploads/2014/08/sushipopcorn-1024x683.jpg',
          category: 'Savory'
        },
        {
          name: "PopMallowCorn",
          price: 9,
          description: 'The favorite of co-owner Nick, this is the Lucky Charms of gourmet popcorn.',
          imageurl: 'https://www.dessertnowdinnerlater.com/wp-content/uploads/2020/08/Marshmallow-Popcorn-4.jpg',
          category: 'Sweet'
        },
        {
          name: "Cookies & Cream",
          price: 12,
          description: 'Get ready for your favorite ice cream flavor in a bag of popcorn.',
          imageurl: 'https://www.iheartnaptime.net/wp-content/uploads/2017/06/cookies-and-cream-popcorn-recipe.jpg',
          category: 'Sweet'
        },
        {
          name: "ParmCorn",
          price: 10,
          description: 'A little lemon, pepper, and parmesan in every handful.',
          imageurl: 'https://www.popcorn.org/Portals/0/EasyDNNnews/704/LemonParmPopcorn.jpg',
          category: 'Savory'
        },
        {
          name: "Chex Mix Popcorn",
          price: 10,
          description: 'Guaranteed cereal-free, but with all the nostalgic holiday flavor you love.',
          imageurl: 'https://thepracticalkitchen.com/wp-content/uploads/2020/06/chex_mix_popcorn-0318-1-scaled.jpg',
          category: 'Savory'
        },
        {
          name: "Poppy Chow",
          price: 12,
          description: 'This bag of childhood nostalgia is just like Grandma used to make. Unlike Grandma, we will never pinch your cheeks.',
          imageurl: 'https://tornadoughalli.com/wp-content/uploads/2017/12/Puppy-Chow-Popcorn1.jpg',
          category: 'Sweet'
        },
        {
          name: "Pickle Rick's Pick",
          price: 10,
          description: 'No need to travel through interdimensional space to enjoy this salty, briny classic.',
          imageurl: 'https://images.squarespace-cdn.com/content/v1/55e6fdb0e4b05e0262ccf48d/1629323433167-Q36BRMJI4611J34QF9K2/PXL_20210818_205019224.PORTRAIT.jpg?format=1000w',
          category: 'Savory'
        },
        {
          name: "Peanut Butter Jelly Time",
          price: 9,
          description: 'Where he at? Where he at? Where he at? Where he at? There he go. There he go. There he go. There he go.',
          imageurl: 'https://cravingkernels.com/wp-content/uploads/2021/06/10.jpg',
          category: 'Sweet'
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
        {userId: 1, status: 'completed'},
        {userId: 1, status: 'canceled'},
        {userId: 2, status: 'created'},
        {userId: 2, status: 'completed'},
        {userId: 2, status: 'canceled'},
        {userId: 3, status: 'created'},
        {userId: 3, status: 'completed'},
        {userId: 3, status: 'canceled'},
        {userId: 4, status: 'created'},
        {userId: 4, status: 'completed'},
        {userId: 4, status: 'canceled'},
        {userId: 5, status: 'created'},
        {userId: 5, status: 'completed'},
        {userId: 5, status: 'canceled'},
        {userId: 6, status: 'created'},
        {userId: 6, status: 'completed'},
        {userId: 6, status: 'canceled'},
        {userId: 7, status: 'created'},
        {userId: 7, status: 'completed'},
        {userId: 7, status: 'canceled'},
        {userId: 8, status: 'created'},
        {userId: 8, status: 'completed'},
        {userId: 8, status: 'canceled'},
        {userId: 9, status: 'created'},
        {userId: 9, status: 'completed'},
        {userId: 9, status: 'canceled'},
        {userId: 10, status: 'created'},
        {userId: 10, status: 'completed'},
        {userId: 10, status: 'canceled'},
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
        {orderId: 1, productId: 1, price: 8, quantity: 2},
        {orderId: 2, productId: 2, price: 10, quantity: 3},
        {orderId: 1, productId: 3, price: 10, quantity: 3},
        {orderId: 2, productId: 4, price: 12, quantity: 1},
        {orderId: 3, productId: 5, price: 12, quantity: 2},
        {orderId: 3, productId: 6, price: 9, quantity: 1},
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
        {title: 'Could NOT stop munching!',
        content: 'Deliciously sweet and salty at the same time!',
        stars: 5,
        userId: 1,
        productId: 1},
        {title: 'Fond memories of my Illinois childhood.',
        content: 'I love the cheese and caramel flavors together, but my dog loves it even more.',
        stars: 4,
        userId: 2,
        productId: 3},
        {title: 'This stuff is dangerous...',
        content: 'So addictive this deserves a listing as a Class A felony substance.',
        stars: 5,
        userId: 3,
        productId: 2},
        {title: 'Hits the spot after a couple cervezas.',
        content: 'A Tecate with a lime and a handful of this stuff and I am back on the beaches of Zihuatanejo.',
        stars: 4,
        userId: 4,
        productId: 4},
        {title: 'Sushi bar umami in a bag!',
        content: 'So good it belongs on the appetizer menu at your favorite sushi joint.',
        stars: 4,
        userId: 1,
        productId: 5},
        {title: 'Pretty dang sweet.',
        content: 'This is okay, but that Nick guy must have a serious sweet tooth. Too sugary for my taste.',
        stars: 3,
        userId: 4,
        productId: 6},
        {title: 'Meh.',
        content: 'Not bad, but there is better kettle corn out there.',
        stars: 3,
        userId: 1,
        productId: 1},
        {title: 'Heavy on caramel, just the way I like it.',
        content: 'A good chicago style popcorn needs more caramel than cheese. These folks do NOT skimp on the caramel.',
        stars: 5,
        userId: 2,
        productId: 3},
        {title: 'Warning: diabetic coma is a possibility...',
        content: 'Good luck rationing this stuff. I certainly could not.',
        stars: 5,
        userId: 3,
        productId: 2},
        {title: 'I cannot fathom how they got all this flavor in one bag...',
        content: 'But I am so glad they did!',
        stars: 4,
        userId: 4,
        productId: 4},
        {title: 'Should NOT work as a popcorn flavor, but it does.',
        content: 'Still, this is very rich and a little goes a long way.',
        stars: 4,
        userId: 1,
        productId: 5},
        {title: 'If I had wanted Lucky Charms or Rice Krispy Treats...',
        content: 'I would have bought them. This is just too much candied popcorn insanity. Over the top.',
        stars: 1,
        userId: 4,
        productId: 6},
        {title: 'Good, but not enough salt & sugar...',
        content: 'I just wanted more.',
        stars: 4,
        userId: 1,
        productId: 1},
        {title: 'Wrigleyville in every bite.',
        content: 'Forget crackerjack, this is what I want during my 7th inning stretch.',
        stars: 4,
        userId: 2,
        productId: 3},
        {title: 'After I finished eating this...',
        content: 'I immediately called my dentist to take care of my new cavities.',
        stars: 4,
        userId: 3,
        productId: 2},
        {title: 'My husband grew up in Juarez...',
        content: 'And he says this is the real deal.',
        stars: 5,
        userId: 4,
        productId: 4},
        {title: 'Turning Japanese, I think Im turning Japanese...',
        content: 'I really think so.',
        stars: 4,
        userId: 1,
        productId: 5},
        {title: 'Mainlining sugar.',
        content: 'I just... NO.',
        stars: 2,
        userId: 4,
        productId: 6},
        {title: 'Daaaaaammmmnnnn.',
        content: 'I could barely stop eating this long enough to write a review.',
        stars: 5,
        userId: 5,
        productId: 7},
        {title: 'I would season this differently.',
        content: 'Less lemon, more parm. Then it would be perfect.',
        stars: 3,
        userId: 6,
        productId: 8},
        {title: 'So appreciative...',
        content: 'They actually used real bacon grease in this!',
        stars: 5,
        userId: 7,
        productId: 9},
        {title: 'Good lord this is sweet.',
        content: 'Maybe too sweet? But if you are into that, have at it.',
        stars: 3,
        userId: 8,
        productId: 10},
        {title: 'Rick would love this. Not sure about Morty.',
        content: 'Wubba lubba dub dub.',
        stars: 4,
        userId: 9,
        productId: 11},
        {title: 'Gluten-free PBJ flavor.',
        content: 'No bread, all the PBJ flavor. Love it.',
        stars: 5,
        userId: 4,
        productId: 12},
        {title: 'Dessert with less guilt.',
        content: 'Like eating a DQ blizzard, but with 1/3 the calories.',
        stars: 4,
        userId: 5,
        productId: 7},
        {title: 'Perfect to share with your bae.',
        content: 'A bag of this, a movie, and my man on the couch next to me. Bliss.',
        stars: 4,
        userId: 6,
        productId: 8},
        {title: 'We eat this year-round...',
        content: 'Not just over the holidays.',
        stars: 5,
        userId: 7,
        productId: 9},
        {title: 'Woof.',
        content: 'Tail wag.',
        stars: 4,
        userId: 8,
        productId: 10},
        {title: 'Life is effort, and I will stop when I die! -Jerry',
        content: 'Or when I eat a bag of this stuff.',
        stars: 4,
        userId: 9,
        productId: 11},
        {title: 'Wrong jelly...',
        content: 'Grape sucks. Should have gone with boysenberry.',
        stars: 3,
        userId: 4,
        productId: 12},
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
