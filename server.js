const express = require("express");
const cors = require("cors");
const projectController = require("./app/controllers/project.controller")
const app = express();

const PORT = process.env.PORT || 8080;
var corsOptions = {
  origin: [`http://localhost:${PORT}`,`http://localhost:4200`],

};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/project.routes')(app)

// simple route
app.get("/", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200')
    res.json({ message: "You're Connected. Welcome to the application." });
});

// set port, listen for requests

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
  }