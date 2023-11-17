const controller = require("../controllers/project.controller");

module.exports = function(app) {
  app.get("/api/auth/projects", controller.getAllProjects); // Pass the function as a callback
  app.post("/api/auth/projects", controller.createProject); // Pass the function as a callback
};