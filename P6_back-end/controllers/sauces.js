const things = require("../modele/things");
const fs = require("fs");

exports.createThings = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing)
    delete thingObject._id;
    const things = new things({
        ...thingObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });
    things.save()
    .then(()=> res.status(201).json({message: "Votre sauce a bien été enregistré"}))
    .catch(error => res.stutus(400).json({error}));
};

exports.modifyThings = (req, res, next) =>{
    const thingObject = req.file ?
    {
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {...req.body}
    things.updateteOne({_id: req.params.id}, {...thingObject, _id: req.params.id})
    .then(() => res.status(200).json({message: "Vos modifications ont bien été prises en compte."}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteThings = (req, res, next) =>{
    things.findOne({_id: req, res, next})
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

exports.getOneThings = (req, res, next)=> {
    things.findOne({_id: req.params.id})
    .then(things => res.status(200).json({things}))
    .catch(error =>res.status(404).json({error}));
};

exports.getAllThings = (req, res, next)=>{
    things.find()
    .then(things => res.status(200).json({things}))
    .catch(error => res.status(400).json({error}));
};