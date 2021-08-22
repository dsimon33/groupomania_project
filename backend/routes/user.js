const authJwt = require("../middleware/authJwt");
const controller = require("../controllers/user");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/auth/all", controller.allAccess);

  app.get(
    "/api/auth/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/auth/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/auth/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/auth", authJwt.verifyToken, authJwt.isAdmin, controller.findAll); // Récupérer tous les Utilisateurs
  app.get("/api/auth/:id", authJwt.verifyToken, controller.findOne) // Récupérer un seul utilisateur
  app.delete("/api/auth/:id", authJwt.verifyToken, authJwt.isAdmin, controller.delete) // Supprimer un utilisateur
  app.put("api/auth/:id", authJwt.verifyToken, controller.update) // Modifier un utilisateur

};