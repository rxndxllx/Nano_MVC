/*
|   Initializing Express
*/
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash')();
const path = require('path');

/*
|   Setting view engine and views and assets path
*/
app.use(express.static(path.join(__dirname, "/assets")));
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

/*
|   Importing and using configurations
*/
const config = require('./config/app-config');
app.use(session(config.session));
const server = app.listen(config.port);

/*
|
*/
app.use(flash);
app.use(express.urlencoded({ extended: true }));

/*
|   Importing and using routes per controller
*/
const routes = require('./routes/users-routes');
app.use(routes);



