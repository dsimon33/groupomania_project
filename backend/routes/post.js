
const posts = require("../controllers/post.js");
const multer = require ("../middleware/multer-config");
const auth = require ("../middleware/authJwt");

module.exports = app => {

  let router = require("express").Router();

  // Create a new post
  router.post("/", auth.verifyToken, multer, posts.createPost); // Créer un nouveau post
  router.get("/", auth.verifyToken, posts.findAll); // Récupérer tous les post
  router.get("/report", auth.verifyToken,auth.isAdmin, posts.findAllReport); // Récupérer tous les post signalés
  router.get("/:id", auth.verifyToken, posts.findOne) // Récupérer un seul post
  router.put("/:id", auth.verifyToken, multer, posts.update) // Mettre un post à jour
  router.delete("/:id", auth.verifyToken, posts.delete) // Supprimer un post
  router.delete("/", auth.verifyToken,auth.isAdmin, posts.deleteAll) // Supprimer tous les posts
  

 
  app.use('/api/posts', router);
};


  