module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("projects", {
      title: {
        type: Sequelize.STRING
      },
      tech: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      image: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      imageType: {
        type: Sequelize.STRING
      },
      ImageName: {
        type: Sequelize.STRING
      },
      ImageDate: {
        type: Sequelize.BLOB('long')
      }
    });
  
    return Project;
  };