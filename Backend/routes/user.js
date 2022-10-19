//Appelle le framework express.
const express = require("express");

//Appelle la fonction router d'express.
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
