const jwt = require("jsonwebtoken"); /*Import du package jsonwebtoken*/

module.exports = (req, res, next)=>{
    console.log("test");
    try{
        const token = req.headers.authorization.split("")[1];
        const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
        const userId = decodedToken.userId;

        console.log('userid:', req.body.userId)


        if(req.body.userId && req.body.userId !== userId){
            throw "Cet identifidant n'est pas valable";
        
        }else{
            next();
        }

    } catch(error){
        console.log(error)
        res.status(401).json({error: error | "L'authentification a échoué"})
    };
};