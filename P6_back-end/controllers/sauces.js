const things = require("../modele/things"); /*Import du things depuis le dossier modele*/
const fs = require("fs"); /*Import du package File System ou fs de Node pour la supression des données dans la base de données */


// Export de la logique route pour créer un objet 
exports.createThings = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id;
    const things = new things({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` /*Pour générer dynamiquement l'URL de l'image*/
    });
    things.save()
    .then(()=> res.status(201).json({message: "Votre sauce a bien été enregistré"}))
    .catch(error => res.stutus(400).json({error}));
};


// Export de la logique route pour modifier un objet 
exports.modifyThings = (req, res, next) =>{
    const thingObject = req.file ?
    {
        /*Modification avec téléchargement d'une nouvelle image*/ 
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {...req.body}; /*Modification sans téléchargement d'une nouvelle image*/ 
    things.updateteOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
    .then(() => res.status(200).json({message: "Vos modifications ont bien été prises en compte."}))
    .catch(error => res.status(400).json({error}));
};


// Export de la logique route supprimer un objet
exports.deleteThings = (req, res, next) =>{
    things.findOne({_id: req, res, next}) /*Pour cibler l'objet à supprimer de la base de données*/
    .then(thing => {
        const filename = thing.imageUrl.split("/images/"); 
        fs.unlink(`images/${filename}`, () =>{
            things.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: "Sauce supprimé"}))
                .catch(error => res.status(400).json({error}));
        })
    })
    .catch(error =>res.status(500).json({error}));
};


// Export de la logique route pour afficher un seul objet
exports.getOneThings = (req, res, next)=> {
    things.findOne({_id: req.params.id})
    .then(things => res.status(200).json({things}))
    .catch(error =>res.status(404).json({error}));
};


// Export de la logique route pour afficher tous les objets
exports.getAllThings = (req, res, next)=>{
    things.find()
    .then(things => res.status(200).json({things}))
    .catch(error => res.status(400).json({error}));
};