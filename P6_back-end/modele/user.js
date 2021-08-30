const mongoose = require("mongoose"); /*Import de Mongoose*/
const uniqueValidator = require("mongoose-unique-validator"); /*Import du Package Unique validator*/

// Schema et contenu accepté dans les champs de connexion 
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, reqired: true}
});

userSchema.plugin(uniqueValidator); /*Empêche l'utilisation de la même adresse plusieurs fois*/

module.exports = mongoose.model("user", userSchema); /*Export du modèle*/
