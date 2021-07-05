// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views/partials")



const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const projectName = "Mojito";
const capitalized = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)} created with IronLauncher`;

// Set up Session settings //

const session = require('express-session')
const MongoStore = require('connect-mongo')

 app.use(session({

    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 24 * 60 * 60
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || "mongodb://localhost/Mojito"
    })
 }))

 ///

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

const userRoutes = require("./routes/user.routes")
app.use("/", userRoutes)

const searchRoutes = require("./routes/search.routes")
app.use("/", searchRoutes)

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const cocktailRoutes = require("./routes/cocktail.routes");
app.use("/", cocktailRoutes);




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;

