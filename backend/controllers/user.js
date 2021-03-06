const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
const fs = require('fs');


exports.allAccess = (req, res) => {
  res.status(200).send;
};

exports.userBoard = (req, res) => {
  res.status(200).send;
};

exports.adminBoard = (req, res) => {
  res.status(200).send;
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send;
};
// Récupérer l'ensemble des users
exports.findAll = (req, res) => {
  const username = req.query.username;
  let condition = username ? { username: { [Op.like]: `%${username}%` }} : null;

  User.findAll({
    where: condition,
    attributes : [
      'id',
      'username',
      'email',
      'introduction',
      [sequelize.fn('date_format', sequelize.col('User.createdAt'), '%d/%m/%Y %H:%i:%s'), 'createdAt']
    ],

    order : [['username', 'ASC']],
  })

  .then(data => {
    res.send(data);
    console.log(data);
  })
  .catch(err =>{
    res.status(500).send({ message: err.message });
  })
}
// Récupérer un seul User
exports.findOne = (req,res) => {
  const id = req.params.id;

  User.findByPk(id, {
    where: { id: id },
    attributes: [
      'id',
      'introduction',
      'email',
      'username',
      [sequelize.fn('date_format', sequelize.col('User.createdAt'), '%d/%m/%Y %H:%i:%s'), 'createdAt']
    ],
    
    include: {
      model: Role,
      attributes: ['name', 'id']
    },
  })
  .then(data => {
    res.status(200).send({data: data, message: `L'utilisateur a été trouvé ` });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  })
}

// Supprimer un Utilisteur
exports.delete =(req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id}
  })
  .then(num => {
    if (num == 1) {
      res.send({message: `Suppression de l'utlisateur réussie`});
    }
    else {
      res.send({ messsage: `impossible de supprimer l'utilisateur avec id= ${id}.` });
    }
  })
  .catch(err => {
    res.status(500).send({ message: `erreur de suppression de l'utilisateur ` + id });
  });
};

// Mettre à jour un utilisateur
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({ message: `L'utilisateur a été mis à jour`});
      }
      else {
        res.send({ messsage: `impossible de mettre à jour l'utlisateur' avec id=${id}.` });
      }
    })
    .catch(err => {
      res.status(500).send({ message: `erreur de mise à jour de l'utilisateur` + id });
    });
};