const sauceModel = require("../modele/sauce"); /*Import du things depuis le dossier modele*/
const fs = require("fs"); /*Import du package File System ou fs de Node pour la supression des données dans la base de données */


// Export de la logique route pour créer un objet 
exports.createSauce = (req, res, next) => {
    console.log('req body', req.body)
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id;
    const sauce = new sauceModel({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` /*Pour générer dynamiquement l'URL de l'image*/
    });
    sauce.save()
        .then(()=> res.status(201).json({message: "Votre sauce a bien été enregistré"}))
        .catch(error => res.status(400).json({error}));
};


// Export de la logique route pour modifier un objet 
exports.modifySauce = (req, res, next) =>{
    const sauceObject = req.file ?
    {
        /*Modification avec téléchargement d'une nouvelle image*/ 
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {...req.body}; /*Modification sans téléchargement d'une nouvelle image*/ 
    sauceModel.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: "Vos modifications ont bien été prises en compte."}))
        .catch(error => res.status(400).json({error}));
};




// Export de la logique route pour supprimer un objet
exports.deleteSauce = (req, res, next) =>{
    sauceModel.findOne({_id: req, res, next}) /*Pour cibler l'objet à supprimer de la base de données*/
        .then(sauce => {
            const filename = sauce.imageUrl.split("/images/"); 
            fs.unlink(`images/${filename}`, () =>{
                sauceModel.deleteOne({_id: req.params.id})
                    .then(() => res.status(200).json({message: "Sauce supprimé"}))
                    .catch(error => res.status(400).json({error}));
            })
        })
        .catch(error =>res.status(500).json({error}));
};


// Export de la logique route pour afficher un seul objet
exports.getOneSauce = (req, res, next)=> {
    sauceModel.findOne({_id: req.params.id})
        .then(sauce => res.status(200).json(sauce))
        .catch(error =>res.status(404).json({error}));
};


// Export de la logique route pour afficher tous les objets
exports.getAllSauces = (req, res, next)=>{
    sauceModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({error}));
};

