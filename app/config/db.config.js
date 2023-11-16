module.exports = {
    HOST: "localhost",
    USER: "shamito",
    PASSWORD: "shami",
    DB: "hackathon",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };