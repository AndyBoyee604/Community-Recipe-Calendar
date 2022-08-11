const router = require("express").Router();
const { Post, User, Comment, Recipe } = require("../models");

router.get("/random-recipe", (req, res) => {
  res.render("random-recipe");
});

router.get("/", (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: ["id", "post_url", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      const posts = dbRecipeData.map((post) => post.get({ plain: true }));
      // pass a single post object into the homepage template
      res.render("homepage", {
        posts,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "post_url", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      // serialize the data
      const post = dbRecipeData.get({ plain: true });

      // pass data to template
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Can only access the dashboard if they are logged in
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

// Can only edit and delete posts if logged in (this will be done through the dashboard)
router.get('/edit/:id', (req, res) => {
  Post.findByPk(req.params.id, {
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
        const recipe = dbRecipeData.get({ plain: true });
        
        res.render('recipe-info', {
          recipe,
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
