// Le schema des données envoyées dans le server
const mongoose = require("mongoose"); /*Import de MONGOOSE pour construire un schema de données*/
const multer = require('../middleware/multer-config');


// Création du schéma pour un produit avec ses attributs 
const Schema = new mongoose.Schema({
    userId: { type: String, required: true },             // Identifiant unique de l'utilisateur
    name: { type: String, required: true },               // Nom du produit
    manufacturer: { type: String, required: true },       // Fabricant du produit
    description: { type: String, required: true },        // Description du produit
    mainPepper: { type: String, required: true },         // Principal ingrédient épicé du produit
    imageUrl: { type: String, required: true },           // URL de l'image du produit
    heat: { type: Number, required: true },               // Niveau de piquant du produit
    likes: { type: Number, default: 0 },                  // Nombre de "j'aime" pour le produit (avec une valeur par défaut de 0)
    dislikes: { type: Number, default: 0 },               // Nombre de "je n'aime pas" pour le produit (avec une valeur par défaut de 0)
    usersLiked: [String],     // Liste des ID des utilisateurs qui ont "aimé" le produit
    usersDisliked: [String],  // Liste des ID des utilisateurs qui n'ont "pas aimé" le produit
});

module.exports = mongoose.model("sauce", Schema); /* Exporte le modèle du schema de donnés créé*/