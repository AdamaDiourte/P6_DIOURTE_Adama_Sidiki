/*BASE DE DONNEES*/
const mongoose = require("mongoose"); /*Import du package Mongoose pour se connecter à la base de données*/
const dotenv = require("dotenv"); /* Import du package des variables d'environment*/
const result = dotenv.config();


mongoose.connect(`mongodb+srv://${process.env.BD_USERNAME}:${process.env.BD_PASSWORD}@${process.env.BD_CLUSTER}.vmlml.mongodb.net/${process.env.BD_NAME}?retryWrites=true&w=majority`, /* Lien de la base de données sur MongoBD*/
{ useNewUrlParser: true,
useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));




module.exports = mongoose;