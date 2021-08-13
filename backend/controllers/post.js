// Importation de l'objet de la BDD
const db = require("../models");
const Post = db.post;
const User = db.user;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const fs = require('fs');


// Création d'un post
exports.createPost = (req, res) => {

  // Sauvegarde du post dans la base de données
  Post.create({
    title: req.body.title,
    description: req.body.description,
    attachment: req.body.attachment,
    report: req.body.report,
    userId: req.body.userId
  })
    .then(data => {
      res.status(201).send({ data: data, message: 'Votre Post a été crée avec succés' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });

    });
};


// Récupération des posts avec recherche sur le titre
exports.findAll = (req, res) => {
  const title = req.query.title;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Post.findAll({
    where: condition,
    attributes: [
      'id',
      'title',
      'description',
      'attachment',
      'report',
      [sequelize.fn('date_format', sequelize.col('Post.createdAt'), '%d/%m/%Y %H:%i:%s'), 'createdAt']
    ],


    include: {
      model: User, as: 'userpost',
      attributes: ['username', 'id']
    },
    order: [['createdAt', 'DESC']],
  })

    .then(data => {
      res.send(data);
      console.log(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    })
};

// Récupérer un seul post
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id, {
    where: { id: id },
    attributes: [
      'id',
      'title',
      'description',
      'attachment',
      'report',
      [sequelize.fn('date_format', sequelize.col('Post.createdAt'), '%d/%m/%Y %H:%i:%s'), 'createdAt']
    ],


    include: {
      model: User, as: 'userpost',
      attributes: ['username', 'id']
    },
  })
  
    .then(data => {
  res.status(200).send({ data: data, message: 'Le post a été trouvé' });
})
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
}


// Mettre à jour un post
exports.update = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'le post a été mis à jour' });
      }
      else {
        res.send({ messsage: `impossible de mettre à jour le post avec id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'erreur de mise à jour du post' + id });
    });
};

// Supprimer un post
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: 'le post a été suppimé avec succés' });
      }
      else {
        res.send({ messsage: `impossible de supprimer le post avec id= ${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'erreur de suppression du post' + id });
    });
};

// Supprimer tous les posts
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Les posts ont été supprimés avec succés !` });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Des erreurs empêchent la suppresions des posts." });
    });
};

// Récupérer des posts par condition
exports.findAllReport = (req, res) => {
  Post.findAll({
    where: { report: true },
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Des erreurs empêchent la récupération des posts." });
    });
};