const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedRecipes = require('./recipe-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');
  
    await seedPosts();
    console.log('--------------');
  
    await seedComments();
    console.log('--------------');

    await seedRecipes();
    console.log('--------------');
  
    process.exit(0);
  };
  
  seedAll();