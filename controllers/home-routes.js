const router = require("express").Router();
const { Post, User, Comment, Recipe } = require("../models");

router.get("/random-recipe", (req, res) => {
  res.render("random-recipe", { loggedIn: true });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get('/', (req, res) => {
  console.log(req.session);
    Post.findAll({
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // pass a single post object into the homepage template
        res.render('homepage', { 
          posts,
          loggedIn: req.session.loggedIn
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
      attributes: [
        'id',
        'post_url',
        'title',
        'created_at'
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // serialize the data
        const post = dbPostData.get({ plain: true });
  
        // pass data to template
        res.render('single-post', { 
          post,
          loggedIn: req.session.loggedIn
         });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

  router.get("/recipe", (req, res) => {
    Recipe.findAll({
      where: {
        // use the ID from the session instead of body
        user_id: req.session.user_id,
      },
      attributes: [
        "id",
        "description",
        "recipe_title",
        "ingredients",
        "instructions",
        "created_at",
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    })
      .then((dbRecipeData) => {
        // serialize data before passing to template
        const recipes = dbRecipeData.map((recipe) => recipe.get({ plain: true }));
        res.render("recipe-info", { recipes, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/recipe/:id', (req, res) => {
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
        if (!dbRecipeData) {
          res.status(404).json({ message: 'No recipe found with this id' });
          return;
        }
  
        // serialize the data
        const recipe = dbRecipeData.get({ plain: true });
  
        // pass data to template
        res.render('recipe-info', { 
          recipe,
          loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
  });

module.exports = router;
