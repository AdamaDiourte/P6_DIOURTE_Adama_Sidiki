const express = require("express"); /*Import du Package EXPRESS*/
const router = express.Router(); /*Construction des routes à partir du Package EXPRESS*/
const saucesCtrl = require("../controllers/sauces"); /*Import de la logique de contôle depuis le dossier controllers*/
const auth = require("../middleware/auth"); /*Import de la logique d'authentification depuis le dossier middleware */
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, saucesCtrl.createSauce); /*Route pour envoyer avec des contôles : authentification, Traitement du fichier image et logique définie dans controllers*/

router.put("/", auth, multer, saucesCtrl.modifySauce); /*Route pour modifier avec des contôles : authentification, Traitement du fichier image et logique définie dans controllers*/

router.delete("/:id", auth, saucesCtrl.deleteSauce ); /*Route pour supprimer avec des contôles : authentification, Traitement du fichier image et logique définie dans controllers*/

router.get("/:id", auth, saucesCtrl.getOneSauce); /*Route pour afficher un article avec des contôles : authentification et logique définie dans controllers*/

router.get("/", auth, saucesCtrl.getAllSauces); /*Route pour afficher tous les articles avec des contôles : authentification et logique définie dans controllers*/

module.exports = router; /*Export des routes*/