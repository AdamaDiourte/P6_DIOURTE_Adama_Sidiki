const express = require('express');
const sauceController = require("../controllers/sauce.js");
const router = express.Router(); // import de la foction router d'Express
const multer = require('../middleware/multer-config.js');
const auth = require('../middleware/auth.js');
const likeController = require("../controllers/like.js"); // Importez le contrôleur de like
console.log("ROUTES SAUCE :"+sauceController);

// Route pour créer une sauce 
//router.post('/', sauceController.createSauce); // Pour créer une sauce
router.post('/', auth, multer, sauceController.createSauce); // Pour créer une sauce
router.get('/', auth, sauceController.getAllsauce); // Pour affcihier toutes les sauces

router.get('/:id',auth, sauceController.getOneSauce); // Pour afficher une seule sauce

router.put('/:id', auth, multer, sauceController.modifyOneSauce); // Pour modifier des données d'une sauce

router.delete('/:id', auth, sauceController.deleteOneSauce); // Pour supprimer une sauce créé

// Route pour liker ou disliker une sauce
router.post('/:id/like', auth, likeController.likeOrDislikeSauce);


module.exports = router;