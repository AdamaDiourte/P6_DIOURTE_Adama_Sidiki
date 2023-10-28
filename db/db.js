// Importation du package mongoose pour gérer la connexion à MongoDB
const mongoose = require('mongoose');

// Importation de dotenv pour la gestion des variables d'environnement 
const dotenv = require('dotenv');

// Configuration de dotenv pour lire les variables d'environnement
dotenv.config();

// Établissement de la connexion à MongoDB avec les informations fournies dans les variables d'environnement
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true, // Utilise le nouvel analyseur d'URL de mongoose pour éviter les avertissements dépréciés
        useUnifiedTopology: true // Utilise le nouveau moteur de gestion de topologie pour éviter les avertissements dépréciés
    }
)
  .then(() => console.log('MongoDB Connecté!')) // Si la connexion réussit, affichez un message dans la console
  .catch(err => console.log('Connexion à MongoDB a échoué')); // En cas d'erreur, affichez l'erreur dans la console

// Exportation de l'instance mongoose pour l'utiliser dans d'autres modules
module.exports = mongoose;
