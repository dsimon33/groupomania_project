const db = require("../models");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = require("../models/user");

exports.signup = (req, res) => {
  console.log(obfuscateemail(req.body.email));
  // Save User to Database
  User.create({
    username: req.body.username,
    email: obfuscateemail(req.body.email),
    introduction: req.body.introduction,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Utilisateur bien enregistré" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Utilisateur non trouvé !" });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mot de passe invalide !"
        });
      }

      let token = jwt.sign({ id: user.id }, process.env.SECRET, {
        expiresIn: 86400 // 24 hours
      });

      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          introduction: user.introduction,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
function obfuscateemail(email) {
  const emailSplit = email.split("@");// Décomposition du mail
  const beforeArob = emailSplit[0]; // Récupération de la partie situé avant '@'
  const emailRight = emailSplit[1].split("."); // Décomposition de la partie située aprés '@'
  const afterArob = emailRight[0]; // Récupération de la partie situé aprés '@' et avant '.'
  const maskLeft = replaceWithStar(beforeArob);
  const maskRight = replaceWithStar(afterArob);
  return `${maskLeft}@${maskRight}.${emailRight[1]}`// Renvoie l'aresse mail obfusquée
};

function replaceWithStar(str) {
  let outPut = "";
  for (let i = 0; i < str.length; i++) {
    if (i < str.length / 2) {
      outPut += "*";
    }
    else {
      outPut += str[i];
    }
  }
  return outPut
};