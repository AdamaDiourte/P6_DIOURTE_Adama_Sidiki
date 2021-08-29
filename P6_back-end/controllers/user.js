const bcrypt = require("bcrypt");
const user = require("../modele/user"); 
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next)=> {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new user({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(()=> res.status(201).json({message:"Votre compte a bien été crée"}))
        .catch(error =>res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next)=> {
    user.findOne({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(401).json({error: "Ce compte n'existe pas"});
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid =>{
            if(!valid){
                return res.status(401).json({error: "Le mot de passe saisi est incorrect"})
            }
            res.status(200).json({
                userId: user._id,
                token:jwt.sign(
                    {usrId: user_id},
                    "RANDOM_TOKEN_SECRET",
                    {expiresId: "24h"}

                )
            });
        })
        .catch(error =>res.status(500).json({error}));
    })
    .catch(error =>res.status(500).json({error}));
};