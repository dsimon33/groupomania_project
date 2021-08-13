// Importation de l'objet de la BDD
const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;
const sequelize = db.Sequelize;
const Comment = db.comment;
const fs = require('fs');


// Création d'un commentaire
exports.createComment = (req, res) => {

  // Sauvegarde du commentaire dans la base de données
  Comment.create({
    content: req.body.content,
    postId: req.body.postId,
    userId: req.body.userId
  })
    .then(data => {
      res.status(201).send({ data, message: 'Votre Commentaire a été crée avec succés' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });

    });
};

exports.findAll = (req, res) => {

  let condition = { postId: req.params.postId };

  Comment.findAll({ 
    where: condition,
    attributes: [
      'id',
      'content',
      [sequelize.fn('date_format', sequelize.col('Comment.createdAt'), '%d/%m/%Y %H:%i:%s'), 'createdAt']
    ],
      
  
    include: {
      model: User, as: 'usercomment',
      attributes: ['username', 'id']
    },
    order: [['createdAt', 'DESC']],
  })
    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({ message: "erreur de recup" });
    })
};

// Supprimer un commentaire
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'le commentaire a été suppimé avec succés' });
      }
      else {
        res.send({ messsage: `impossible de supprimer le commentaire avec id= ${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'erreur de suppression du commentaire' + id });
    });
};

// Supprimer tous les commentaires
exports.deleteAll = (req, res) => {
  Comment.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les commentaires ont été supprimés avec succés !` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Des erreurs empêchent la suppresions des commentaires." });
    });
};