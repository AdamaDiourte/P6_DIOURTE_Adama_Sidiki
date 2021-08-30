const express = require("express"); /*Import du Package EXPRESS*/
const router = express.Router(); /*Création d'un router avec la Méthode router*/
const userCtrl = require("../controllers/user" ); /*Controllers pour associer les différentes routes*/

router.post("/signup", userCtrl.signup); /*Route pour s'inscrire*/
router.post("/login", userCtrl.login); /*Route pour se connecter*/


module.exports = router; /*Export du router*/