const sauceModel = require('../models/sauce');

exports.likeOrDislikeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const likeValue = req.body.like;

    sauceModel.findOne({ _id: req.params.id })
        .then(sauce => {
            let update = { $inc: {} };

            // Retirer l'utilisateur des tableaux s'il y est déjà
            if (sauce.usersLiked.includes(userId)) {
                update.$pull = { usersLiked: userId };
                update.$inc.likes = -1;
            } else if (sauce.usersDisliked.includes(userId)) {
                update.$pull = { usersDisliked: userId };
                update.$inc.dislikes = -1;
            }

            // Ajouter l'utilisateur au tableau correspondant à son nouveau choix
            if (likeValue === 1) {
                update.$push = { usersLiked: userId };
                update.$inc.likes = (update.$inc.likes || 0) + 1;
            } else if (likeValue === -1) {
                update.$push = { usersDisliked: userId };
                update.$inc.dislikes = (update.$inc.dislikes || 0) + 1;
            }

            return sauceModel.updateOne({ _id: req.params.id }, update);
        })
        .then(() => res.status(200).json({ message: 'Action effectuée avec succès!' }))
        .catch(error => res.status(400).json({ error }));
};
