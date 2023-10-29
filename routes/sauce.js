const express = require('express');
const sauceController = require("../controllers/sauce.js");
const router = express.Router(); // import de la foction router d'Express
const multer = require('../middleware/multer-config.js');
const auth = require('../middleware/auth.js');
const likeController = require("../controllers/like.js"); // Importez le contrôleur de like


// LES DIFFERRENTES ROUTES 
router.post('/', auth, multer, sauceController.createSauce); // Route pour créer une sauce
router.get('/', auth, sauceController.getAllsauce); // Route pour affcihier toutes les sauces
router.get('/:id',auth, sauceController.getOneSauce); // Route pour afficher une seule sauce
router.put('/:id', auth, multer, sauceController.modifyOneSauce); // Route pour modifier des données d'une sauce
router.delete('/:id', auth, sauceController.deleteOneSauce); // Route pour supprimer une sauce créé
router.post('/:id/like', auth, likeController.likeOrDislikeSauce); // Route pour liker ou disliker une sauce


module.exports = router;