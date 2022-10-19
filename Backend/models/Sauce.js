//Appel de mongoose pour utiliser plus loin sa fonction Schema.
const mongoose = require("mongoose");

//Création d'un Schema (model) pour les sauces.
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  usersLiked: { type: Array, default: [], required: true },
  usersDisliked: { type: Array, default: [], required: true },
});

module.exports = mongoose.model("Sauce", sauceSchema);
