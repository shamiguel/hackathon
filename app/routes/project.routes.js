const controller = require("../controllers/project.controller");

module.exports = function(app) {
  app.get("/api/auth/projects", controller.getAllProjects); 
  app.post("/api/auth/projects", controller.createProject);
  app.put("/api/auth/projects/:id", controller.updateProject);
  app.delete("/api/auth/projects/:id", controller.deleteProject);
};