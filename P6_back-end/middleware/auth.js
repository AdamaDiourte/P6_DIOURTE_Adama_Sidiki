const jwt = require("jsonwebtoken"); /*Import du package jsonwebtoken*/

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.autorization.split("")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw "Cet identifidant n'est pas valable";
        }else{
            next();
        }

    } catch(error){
        res.status(401).json({error: error | "L'authentification a échoué"})
    };
};