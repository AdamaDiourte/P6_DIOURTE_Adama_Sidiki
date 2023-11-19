const express = require('express'); // Import du Framwork Express
const app = express(); // Liaison du pakage Express à l'application
const morgan = require('morgan'); // Import du pakage morgan
const cors = require('cors'); // Pour gérer les restriction d'accès au serveur 
const mongoose = require('./db/db'); // Logique de la base de données
//const bodyParser = require('body-parser'); // Import du package Body-parser pour transformer les requête en Json 
const userRoutes = require('./routes/user'); // Import des routes USER
const sauceRoutes = require('./routes/sauce'); // Import des routes vers les sauces mises en lignes
const path = require('path');


app.use(morgan("dev")); // Pour voir le statut de chaque requeête, si elle a réussi ou non
mongoose.set('debug', true);


// LES REQUETES ET LES ROUTES
app.use(cors()); //Gestion des problèmes CORS
app.use(express.json()); // Pour transformer le coprs des requeêtes en JSON
app.use("/images", express.static(path.join(__dirname, "images"))); //Pour trouver le chemin d'une image téléchargée à partir d'un fichier
app.use("/api/sauces", sauceRoutes); /*Chaque route sera précédée par /api/sauces*/
app.use("/api/auth",userRoutes); // Route d'authentification


module.exports = app;