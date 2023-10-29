const sauceModel = require('../models/sauce.js'); // Importation du modèle de sauce pour la base de données
const auth = require('../middleware/auth.js'); // Adaptez le chemin selon l'emplacement de votre middleware auth.
const fs = require('fs');

// Création d'une nouvelle sauce
exports.createSauce = (req, res, next) => {
    // Récupération des détails de la sauce à partir de la requête
    const sauceObject = JSON.parse(req.body.sauce);
    // Construction de l'URL pour l'image téléchargée
    sauceObject.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
    // Création de la sauce à partir du modèle
    const sauce = new sauceModel({ ...sauceObject });
    // Enregistrement de la sauce dans la base de données
    sauce
        .save()
        .then(() => {
            res.status(201).json({ message: "La sauce a bien été enregistrée dans la base de données", contenu: req.body });
        })
        .catch(error => res.status(400).json({ error }));
};

// Récupération de toutes les sauces
exports.getAllsauce = (req, res, next) => {
    sauceModel.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(500).json({ error }));
};
// Récupération d'une sauce spécifique par ID
exports.getOneSauce = (req, res, next) => {
    sauceModel.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(500).json({ error }));
};
// Pour modifier un fichier
exports.modifyOneSauce = (req, res, next) => {
    const sauceObject = req.file ? 
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };

    // Récupérez d'abord la sauce existante pour obtenir l'ancienne imageUrl.
    sauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            // Si une nouvelle image est fournie, supprimez l'ancienne image.
            if (req.file) {
                const oldFilename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${oldFilename}`, (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).json({ error: 'Erreur lors de la suppression de l\'ancienne image.' });
                        return;
                    }
                    // Une fois l'ancienne image supprimée, mettez à jour les informations de la sauce.
                    updateSauceData(sauceObject, req, res);
                });
            } else {
                // Si aucune nouvelle image n'est fournie, mettez simplement à jour la sauce.
                updateSauceData(sauceObject, req, res);
            }
        })
        .catch(error => res.status(500).json({ error }));
};

function updateSauceData(sauceObject, req, res) {
    sauceModel.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée!' }))
        .catch(error => res.status(400).json({ error }));
}
//Pour supprimer une saauce
exports.deleteOneSauce = (req, res, next) => {
    // Récupérez la sauce de la base de données pour obtenir le nom du fichier image
    sauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            // Construisez le chemin complet du fichier image
            const filename = sauce.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                // Après avoir supprimé le fichier image, supprimez l'enregistrement de la sauce de la base de données
                sauceModel.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
