// Le schema des données envoyées dans le server
const mongoose = require("mongoose"); /*Import de MONGOOSE pour construire un schema de données*/

// On utlise la méthode schema du package Mongoose
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: true}, 
    heat: {type: Number, required: true},
    likes: {type: Number, required: false},
    dislikes: {type: Number, required: false},
    usersLiked:["${userId}"],
    usersDisliked:["${userId}"],
    
    // price: {type: Number, required: true}
});

module.exports = mongoose.model("sauce", sauceSchema); /* Exporte le modèle du schema de donnés créé*/