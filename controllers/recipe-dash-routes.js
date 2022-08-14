const router = require('express').Router();
const {Recipe, User} = require('../models');
const withAuth = require('../utils/auth');
  
  // Can only access the dashboard if they are logged in
  router.get('/', withAuth, (req, res) => {
    Recipe.findAll({
      where: {
        // use the ID from the session instead of body
        user_id: req.session.user_id
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
        // serialize data before passing to template
        const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
        res.render('recipe', { recipes, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

    // Can only edit and delete posts if logged in (this will be done through the dashboard)
    router.get('/edit/:id', withAuth, (req, res) => {
      Recipe.findByPk(req.params.id, {
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
          if (dbRecipeData) {
            const post = dbRecipeData.get({ plain: true });
            
            res.render('edit-recipe', {
              post,
              loggedIn: true
            });
          } else {
            res.status(404).end();
          }
        })
        .catch(err => {
          res.status(500).json(err);
        });
    });
  

  module.exports = router;