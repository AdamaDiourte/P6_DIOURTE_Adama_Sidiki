const sauceModel = require('../models/sauce');

// Logique du Like et dislik

exports.likeOrDislikeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const likeValue = req.body.like;

    switch (likeValue) {
        case 1: // Cas où l'utilisateur like la sauce
            sauceModel.updateOne(
                { _id: req.params.id },
                { $push: { usersLiked: userId }, $inc: { likes: 1 } }
            )
            .then(() => res.status(200).json({ message: 'Sauce likée!' }))
            .catch(error => res.status(400).json({ error }));
            break;
        
        case -1: // Cas où l'utilisateur dislike la sauce
            sauceModel.updateOne(
                { _id: req.params.id },
                { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } }
            )
            .then(() => res.status(200).json({ message: 'Sauce dislikée!' }))
            .catch(error => res.status(400).json({ error }));
            break;

        case 0: // Cas où l'utilisateur retire son like/dislike
            sauceModel.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(userId)) { // Si l'utilisateur avait liké
                    sauceModel.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
                    )
                    .then(() => res.status(200).json({ message: 'Like retiré!' }))
                    .catch(error => res.status(400).json({ error }));
                } else if (sauce.usersDisliked.includes(userId)) { // Si l'utilisateur avait disliké
                    sauceModel.updateOne(
                        { _id: req.params.id },
                        { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
                    )
                    .then(() => res.status(200).json({ message: 'Dislike retiré!' }))
                    .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(500).json({ error }));
            break;

        default:
            res.status(500).json({ error: 'requêt invalide' });
    }
};
