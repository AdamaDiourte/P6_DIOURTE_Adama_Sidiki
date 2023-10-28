const express = require('express'); // import du package express
const router = express.Router(); // import de la foction router d'Express
const userController = require("../controllers/user.js");
const password = require("../middleware/password.js"); // Importation du password du milddleware 


// le endpoint de la route SIGNUP (s'inscrire)
router.post('/signup', password, userController.signup);


// Le endpoint de la route LOGIN (conexion)
router.post('/login', userController.login);


module.exports = router;
