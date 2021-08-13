const comments = require("../controllers/comment.js");


module.exports = app => {

  let router = require("express").Router();

  // Create a new Comment
  router.post("/", comments.createComment) // Création d'un commentaire
  router.delete("/:id", comments.delete) // Supprimer un post
  router.delete("/", comments.deleteAll) // Supprimer tous les posts
  router.get("/:postId", comments.findAll)

 
  app.use('/api/comments', router);
  
};