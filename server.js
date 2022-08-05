const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3306;

const sequelize = require('./config/connection');

const hbs = exphbs.create({});
 
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});



















// const express = require("express");
// const routes = require("./controllers");
// // import sequelize connection
// const sequelize = require("./config/connection");

// const app = express();
// const PORT = process.env.PORT || 3306;

// //handlebars template engine
// const exphbs = require("express-handlebars");
// const hbs = exphbs.create({});

// const routes = require('./controllers/');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// //handlebars template engine
// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// // sync sequelize models to the database, then turn on the server
// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}!`);
// });



