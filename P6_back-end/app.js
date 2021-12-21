const express = require("express"); /*Import des composants du Framework EXPRESS*/
const bodyParser = require("body-parser"); /*Import du package BODY PARSER qui mettra les données envoyées au format voulu*/
const mongoose = require('mongoose'); /*Import du package MONGOOSE pour la gestion de la base de données*/
const saucesRoutes = require("./routes/sauces"); /*Import des routes*/
const userRoutes = require("./routes/user"); /*Import de la route User depuis le dossier routes*/
const path = require("path"); /*Import de Path depuis Node pour avoir accès au chemin des fichiers*/
const cors = require("cors"); /*import cors*/
const app = express(); /* constante contenant la methode EXPRESS */

mongoose.connect('mongodb+srv://Adama:Ad280186@cluster0.vmlml.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', /* Lien de la base de données sur MongoBD*/
{ useNewUrlParser: true,
useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

// Les middleware qui définissent les coditions d'accès à l'application 
app.use(cors());

// => {

//     // res.setHeader("Access-Control-Allow-Origin", "*"); /*Tout le monde doit avoir accès*/
//     // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content, Accept, Content-type, Autorization");
//     // res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
//     // next();
// };


app.use(bodyParser.json()); /*Formate en JSON les données envoyées depuis le Front-end pour qu'elles soient lisibles par JavaScript*/
app.use("/images", express.static(path.join(__dirname, "images"))); /*Pour trouver le chemin d'une image téléchargée à partir d'un fichier*/
app.use("/api/sauces", saucesRoutes); /*Chaque route sera précédée par /api/sauces*/
app.use("/api/auth", userRoutes); /*Route attendue par le Front-end*/

module.exports = app; /* Export de la constante contenant la méthode EXPRESS pour l'utiliser dans le reste de l'application*/ 
