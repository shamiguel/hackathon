module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
      title: {
        type: Sequelize.STRING
      },
      tech: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      description: {
        type: Sequelize.STRING
      },
      github:{
        type: Sequelize.STRING
      }
    });
  
    return Project;
  };