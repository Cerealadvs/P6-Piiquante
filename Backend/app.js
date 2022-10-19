//Appelle le framework express.
const express = require("express");
//appelle la route user.
const userRoutes = require("./routes/user");
//appelle la route sauce.
const saucesRoutes = require("./routes/sauces");

//Appelle le package mongoose et connecte l'app à la base de données MongoDB.
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://carotte:carotte@cluster0.hmd49.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Permet de créer une application express.
const app = express();

//Appel de la fonction "bodyparser" d'express, transformant les requêtes en string.
app.use(express.json());

//Middleware gérant les problèmes de CORS (Cross Origin Resource Sharing).
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//path indique le chemin du serveur.
const path = require("path");

//Indique à express de gérer les images de manière statique dès qu'elle recoit une requête vers la route /images.
app.use("/images", express.static(path.join(__dirname, "images")));

//Gère la userRoutes, qui appelle la route user.js qui appelle le controller user.js.
app.use("/api/auth", userRoutes);

//Gère la saucesRoutes, qui appelle la route sauces.js qui appelle le controller sauces.js.
app.use("/api/sauces", saucesRoutes);

//Exporte l'application pour qu'elle soit utilisable par les autres fichiers.
module.exports = app;
