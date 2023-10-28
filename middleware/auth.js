const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
module.exports = (req, res, next) => {
    try {
        // Récupérer le token du header Authorization de la requête entrante
        const token = req.headers.authorization.split(' ')[1];

        // Décoder le token
        const decodedToken = jwt.verify(token, `${process.env.JWT_KEY_TOKEN}`); // 'JWT_KEY_TOKEN' est une clé d'authentification
        
        // Extraire l'ID de l'utilisateur du token décodé
        const userId = decodedToken.userId;

        // Si un ID utilisateur est spécifié dans la requête et qu'il ne correspond pas à l'ID utilisateur du token, renvoyer une erreur
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            // Sinon, tout est en ordre, passer au prochain middleware ou à la route
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        });
    }
};
