const { Recipe } = require('../models');

const recipedata = [
  {
    recipe_title: 'French Apple Cake',
    description: "Yessir",
    ingredients: "1/4 of this",
    instructions: "do this and that",
    user_id: 1
  },
  {
    recipe_title: 'French',
    description: "NOOOOOO",
    ingredients: "1/2",
    instructions: "do this and that",
    user_id: 2
  }
   
];

const seedRecipes = () => Recipe.bulkCreate(recipedata);

module.exports = seedRecipes;