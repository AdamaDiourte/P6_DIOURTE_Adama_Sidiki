// Le schema des données envoyées dans le server
const mongoose = require("mongoose"); /*Import de MONGOOSE pour construire un schema de données*/

// On utlise la méthode schema du package Mongoose
const thingsSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true}, 
    userId: {type: String, required: true},
    price: {type: Number, required: true}
});

module.exports = mongoose.model("thing", thingsSchema); /* Exporte le modèle du schema de donnés créé*/