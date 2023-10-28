const mongoose = require('mongoose'); // importation du package mongoose
const uniqueValidator = require("mongoose-unique-validator"); // Importation du package Mongoose unique validator pour plus de détail sur les erreurs de la base de données

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Pour ne pas enregistrer deux fois le même utlisateur 
userSchema.plugin(uniqueValidator);

// Exportation du module
module.exports = mongoose.model("user", userSchema);