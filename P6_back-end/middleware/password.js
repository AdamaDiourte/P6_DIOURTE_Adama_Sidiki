const passwordValidator = require("password-validator"); /*Import du package password pour contôler la force du mot de passe*/
const { schema } = require("../modele/sauce");

/* Schema de validation du mot de passe*/

const passwordSchema = new passwordValidator(); 

/* Le Schema que doit respecter le mot de passe*/
passwordSchema
.is().min(5)           /*nombre de caractères minimum*/
.is().max(20)           /*nombre de caractères maximum*/
.has().uppercase()      /*Doit contnir de la majuscule*/
.has().lowercase()      /*Doit contenir de la minuscule */
.has().digits(2)        /* Doit au moins deux chiffres*/
.has().not().spaces()   /*Pas d'espace entre les caractères*/
.is().not().oneOf(["PasswOrd", "Password123", "123", "azerty" , "qwerty"]);  /*Ces mots de passe ne sont pas acceptés*/



module.exports = (req, res, next) =>{
    if(passwordSchema.validate(req.body.password)){
        next()
    }
    else{
        return res
        .status(400)
        .json({error : "Le mot de passe n'est pas assez fort"  + 
         ` ${passwordSchema.validate('req.body.password', {list: true})}`})
    }

   
}