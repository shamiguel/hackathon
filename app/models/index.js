const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = 
  NODE_ENV === "production"
  ?
new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
) : new Sequelize(
  `postgres://shamio:PZX1g7MCww6jE2nQCFGPOaUY8eNv9cbn@dpg-clif8358td7s73bvnk6g-a/hackathon_2f4x`
)

;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.project = require("../models/project.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;