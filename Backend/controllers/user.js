//Appel du package bcrypt servant à hacher le mot de passe de l'utilisateur.
const bcrypt = require("bcrypt");

//Appel du modèle User (schema mongoose).
const User = require("../models/User");

//Appel du package jsonwebtoken.
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  //Fonction hash de bcrypt, utilisée 10 fois sur le password.
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      //Crée un nouveau user à partir de User.
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      //Le user est enregistré.
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction login appelée lors de la connection d'un user (utilisée dans routes/user.js).
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: "Paire identifiant/mot de passe incorrecte" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: "Paire identifiant/mot de passe incorrecte" });
            } else {
              res.status(200).json({
                userId: user._id,

                token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
