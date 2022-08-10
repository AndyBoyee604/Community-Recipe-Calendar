const sequelize = require('../config/connection');
const { User, Post, Recipe } = require('../models');

const userdata = [
  {
    username: 'kilimba7',
    password: 'password123'
  },
  {
    username: 'luffyOP',
    password: 'password123'
  },
  {
    username: 'YusukeSP',
    password: 'password123'
  },
  {
    username: 'ICHIGOAT',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;