const passwordValidator = require('password-validator'); // Importation du package pour la validation de mot de passe.

// Création du schéma de validation du mot de passe.
const passwordSchema = new passwordValidator();

// Définition des règles pour le schéma du mot de passe :
passwordSchema
.is().min(5)                                   // Longueur minimale du mot de passe.
.is().max(15)                                   // Longueur maximale du mot de passe.
.has().uppercase()                             // Le mot de passe doit contenir au moins une lettre majuscule.
.has().lowercase()                             // Le mot de passe doit contenir au moins une lettre minuscule.
.has().digits(2)                               // Le mot de passe doit contenir au moins 2 chiffres.
.has().not().spaces()                          // Le mot de passe ne doit pas contenir d'espaces.
.is().not().oneOf(["Password", "password1232"])// Le mot de passe ne doit pas être l'un des éléments indiqués dans le tableau.

// Middleware pour la vérification du mot de passe par rapport au schéma.
module.exports = (req, res, next) => {
    // Si le mot de passe est conforme au schéma :
    if (passwordSchema.validate(req.body.password)) {
        console.log("Mot de passe correct");
        next(); // Passe au prochain middleware ou à la fonction suivante dans la chaîne.
    } else {
        // Si le mot de passe n'est pas conforme, retourne une erreur avec la liste des règles non respectées.
        return res
        .status(400)
        .json({error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate(req.body.password, {list: true})}`});
    }
};
