const bcrypt = require("bcrypt"); /*Import du package BRCYPT pour le cryptage des mots de passe*/
const usermodel = require("../modele/user"); /*Import de User depuis le dossier modele*/
const jwt = require("jsonwebtoken"); /*Import du package jsonwebtoken*/

// Fonction pour permettre aux utilisateurs de s'inscrire
exports.signup = (req, res, next)=> {
    bcrypt.hash(req.body.password, 10) /*Le mot de passe est hashé 10 fois*/
    .then(hash => {
        const user = new usermodel({
            email: req.body.email,
            password: hash
        });
        user.save() /*Enregistre le mail et le mot de passe dans la base de données*/
        .then(()=> res.status(201).json({message:"Votre compte a bien été crée"}))
        .catch(error =>res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};


// Fonction permettant aux utisateurs existants de se connecter
exports.login = (req, res, next)=> {
    usermodel.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            // S'il ne trouve pas l'utilisateur 
            return res.status(401).json({error: "Ce compte n'existe pas"});
        }
        // S'il trouve l'utilisateur
        bcrypt.compare(req.body.password, user.password) /*BCRYPT Compare le mot de passe saisi et le mot de passe enregistré*/
        .then(valid =>{
            // Si le mot de passe saisi n'est pas correct
            if(!valid){
                return res.status(401).json({error: "Le mot de passe saisi est incorrect"})
            }
            /*Encodage du TOKEN*/
            res.status(200).json({
                userId: user._id,
                token:jwt.sign(
                    {usrId: user._id},
                    "RANDOM_TOKEN_SECRET",
                    {expiresIn: "24h"}

                )
            });
        })

        .catch(error =>res.status(500).json({error}));
    })
    .catch(error =>res.status(500).json({error}));
    

};