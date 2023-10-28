// Importation des dépendances nécessaires
const User = require("../models/user"); // Modèle d'utilisateur pour MongoDB
const bcrypt = require("bcrypt");       // Bibliothèque pour hasher les mots de passe
const cryptojs = require("crypto-js");  // Bibliothèque pour chiffrer l'email
const dotenv = require("dotenv");       // Pour utiliser des variables d'environnement
dotenv.config();                        // Initialisation de dotenv
const jwt = require("jsonwebtoken"); // importation du controllers webtoken

// Fonction pour la création d'un nouveau compte utilisateur
exports.signup = (req, res, next) => {

    // Chiffrement de l'email avant de le stocker dans la base de données
    const emailCryptojs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CLE_CHIFFREMENT_Email_CRYPTO_JS}`)
    .toString();
    console.log("EMAIL CRYPTO JS", emailCryptojs);

    // Hashage du mot de passe pour assurer sa sécurité avant le stockage
    bcrypt.hash(req.body.password, 10)  // "10" est le nombre de tours utilisé pour le salage du mot de passe
        .then((hash) => {
            // Création d'un nouvel utilisateur avec l'email chiffré et le mot de passe hashé
            const user = new User({
                email: emailCryptojs,
                password: hash
            });
            
            console.log("MOT DE PASSE DU User");
            console.log(user);
            
            // Tentative de sauvegarde du nouvel utilisateur dans la base de données
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé avec succès" }))
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({ error }); // Erreur liée à la sauvegarde (par exemple, un email déjà existant)
                });

        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error }); // Autres erreurs (par exemple, problème avec le hashage du mot de passe)
        });
};

// Login pour s'authentifier ou se connecter
exports.login = (req, res, next) => {
    //Chiffrer l'email de la requeête d'autentification 
    const emailCryptojs = cryptojs
    .HmacSHA256(req.body.email, `${process.env.CLE_CHIFFREMENT_Email_CRYPTO_JS}`)
    .toString();
    console.log("EMAIL CHIFFRE PAR CRYPTO JS");
    console.log("EMAIL :", emailCryptojs);
    
    console.log("==>CONTENU DU LOGIN req EMAIL");
    console.log(req.body.email);

    console.log("==>CONTENU DU req LOGIN pasword");
    console.log(req.body.password);
    // Chercher si l'utilisateur est présent dans la base de données
    User.findOne({email:emailCryptojs})
    .then((user)=>{
        console.log("USER DE FINDONE");
        console.log(user);
        // si le mail de l'utilisateur n'est pas dans la bse de données
        if(!user){
            return res. status(401).json({error: "Utilisateur introuvable"});
        }
        // Contrôler la correspondance du mot de passe saisi avec celui qui est enregristré dans la bse de données
        bcrypt
        .compare(req.body.password, user.password)
        .then((controlPassword)=>{
            console.log(controlPassword);
            // Si le mot de passe saisi n'est pas correct
            if(!controlPassword){
                return res.status(401).json({error:"Mot de pas incorrect"})
            }
            // Si le mot de passe saisi est correct
            res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        `${process.env.JWT_KEY_TOKEN}`,
                        {expiresIn: "1h"}
                    ) // permet à l'usateur d'avoir des droit de création de plsuieurs objets dans la base de données
            })
        })
        .catch((error) => res.status(500).json({error}));

    })
    .catch((error) => res.status(500).json({error}));

};



