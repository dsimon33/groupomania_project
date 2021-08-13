const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.role = require("./role.js")(sequelize, Sequelize);
db.comment = require("./comment.js")(sequelize, Sequelize);
db.post = require("./post.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];

db.post.hasMany(db.comment, { as: "comment", onDelete: "cascade" });// Utilisation de hasMany afin de pouvoir rattacher plusieurs commentaires à un post.
db.comment.belongsTo(db.post, { // Utilisation de belongsTo afin de stipuler que le commentaire n'est rattaché qu'a un seul post.
  foreignKey: "postId",
  as: "post",
});

db.user.hasMany(db.post, { as: "post", onDelete:"cascade" });
db.post.belongsTo(db.user, {
  foreignKey: "userId",
  as: "userpost",
});

db.user.hasMany(db.comment, { as: "comment", onDelete:"cascade" });
db.comment.belongsTo(db.user, {
  foreignKey: "userId",
  as: "usercomment",
})

module.exports = db;