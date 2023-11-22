const db = require("../models");
const Project = db.project;

const createProject = async (req, res) => {
    try {
        let project = await Project.create({
                title: req.body.projectTitle,
                description: req.body.projectDescription,
                tech: req.body.projectTech,
                github: req.body.projectUrl
              });
      return res.status(201).json({ project });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  const getAllProjects = async (req, res) => {
    try {
      const projects = await Project.findAll();
  
      const updatedProjects = projects.map((project) => {
        if(project.imageData){
            const projectImage = project.imageData.toString('base64');
            return { ...project, imageData: projectImage };
        }else{
            return {...project}
        }
      });
  
      return res.status(200).json({ projects: updatedProjects });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  const updateProject = async (req, res) => {
    try {
      console.log("*************updating...",req.body)
        let id = req.params.id 
        let project = await Project.findByPk(id);
        const updated = await project.update({
          title: req.body.projectTitle,
          description: req.body.projectDescription,
          tech: req.body.projectTech,
          github: req.body.projectUrl
        });
      return res.status(201).json({ updated });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  };

  const deleteProject = async (req, res) => {
    try{
      const id = req.params.id
      await Project.destroy({
        where: {id: id}
      });
      return res.status(201).json({id})
    }catch{
      console.error(error);
      return res.status(500).json({ error: error.message});
    }
  }
  
  module.exports = {
    createProject,
    getAllProjects,
    updateProject,
    deleteProject
  };