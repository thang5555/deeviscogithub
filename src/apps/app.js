const express = require("express");
const session = require("express-session")
const config = require("config");
const app = express();

// config View
app.set("views", config.get("app.view_folder"));
app.set("view engine", config.get("app.view_engine"));

app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(config.get("app.static_folder")));


//config session
app.use(session({
  secret: config.get('app.session_key'),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//create Cart
app.use(require("./middlewares/cart")),
app.use(require("./middlewares/share")),

//Router
app.use(require(config.get("app.router")));
module.exports = app;


