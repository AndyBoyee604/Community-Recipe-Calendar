const express = require("express");
const routes = require("./controllers");
// import sequelize connection
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3306;

//handlebars template engine
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

//handlebars template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// sync sequelize models to the database, then turn on the server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

//console.log("Hello World!");
