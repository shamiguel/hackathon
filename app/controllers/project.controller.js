const db = require("../models");
const Project = db.project;

const createProject = async (req, res) => {
    try {
        let project;
        if(req.file){
            project = await Project.create({
                title: req.body.title,
                description: req.body.description,
                tech: req.body.tech,
                
                imageType: req.file.mimetype,
                imageName: req.file.originalname,
                imageData: req.file.buffer,
              });
        }else{
             project = await Project.create({
                title: req.body.title,
                description: req.body.description,
                tech: req.body.tech,
            });
        }
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
  
  module.exports = {
    createProject,
    getAllProjects,
  };