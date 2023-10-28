const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors'); // Gérer les restriction d'accès au serveur 
const mongoose = require('./db/db');
const bodyParser = require('body-parser'); // Import du package Body-parser pour transformer les requête en Json 
const userRoutes = require('./routes/user'); // import des routes USER
const sauceRoutes = require('./routes/sauce'); // import des routes vers les sauces mises en lignes
const path = require('path');


app.use(morgan("dev")); // Pour voir le statut de chaque requeête, si elle a réussi ou non

mongoose.set('debug', true);


// les requêtes des routes

//Gestion des problèmes CORS
// Utiliser cors comme middleware pour votre application
app.use(cors());


app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images"))); /*Pour trouver le chemin d'une image téléchargée à partir d'un fichier*/

//app.use("/api/sauce", sauceRoutes);
app.use("/api/sauces", sauceRoutes); /*Chaque route sera précédée par /api/sauces*/

// Route d'authentification
app.use("/api/auth",userRoutes);



module.exports = app;