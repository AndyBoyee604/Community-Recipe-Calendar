const router = require('express').Router();
const { Recipe, User } = require('../../models');

// get all recipes
router.get('/', (req, res) => {
  console.log('======================');
  Recipe.findAll({
    attributes: [
      'id',
      'description',
      'recipe_title',
      'ingredients',
      'instructions',
      'created_at'
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get a single recipe
router.get('/:id', (req, res) => {
  Recipe.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'description',
      'recipe_title',
      'ingredients',
      'instructions',
      'created_at'
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbRecipeData => {
      if (!dbRecipeData) {
        res.status(404).json({ message: 'No Recipe found with this id' });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', (req, res) => {
  Recipe.create({
    recipe_title: req.body.recipe_title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    user_id: req.session.user_id
  })
    .then(dbRecipeData => res.json(dbRecipeData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // Can only edit if logged in 
// router.put('/:id', withAuth, (req, res) => {
//   Recipe.update(
//     {
//       recipe_title: req.body.recipe_title,
//       description: req.body.description,
//       ingredients: req.body.ingredients,
//       instructions: req.body.instructions,
//     },
//     {
//       where: {
//         id: req.params.id
//       }
//     }
//   )
//     .then(dbRecipeData => {
//       if (!dbRecipeData) {
//         res.status(404).json({ message: 'No Recipe found with this id' });
//         return;
//       }
//       res.json(dbRecipeData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// // Can only delete if logged in 
// router.delete('/:id', withAuth, (req, res) => {
//   Recipe.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbRecipeData => {
//       if (!dbRecipeData) {
//         res.status(404).json({ message: 'No Recipe found with this id' });
//         return;
//       }
//       res.json(dbRecipeData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
