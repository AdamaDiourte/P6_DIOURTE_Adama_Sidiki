const express = require('express'); // import du package express
const router = express.Router(); // import de la foction router d'Express
const userController = require("../controllers/user.js");
const password = require("../middleware/password.js"); // Importation du password du milddleware 

router.post('/signup', password, userController.signup); // Route signup ou création de compte
router.post('/login', userController.login); // Route login ou connexion à son compte

module.exports = router;
