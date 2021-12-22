const multer = require("multer"); /*Import du Package MULTER*/

//Dictionnaire d'extension d'image
const MIME_TYPE = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

// Objet de configuration MULTER
const storage = multer.diskStorage({
    destination: (req, file, callback)=>{
        callback(null, "images") /*Dossier d'enregistrement des fichiers*/
    },
    filename: (req, file, callback)=>{
        const name = file.originalname.split(" ").join("_"); 
        const extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + "." + extension); /*Modèle de nomination des fichiers*/
    }
});

module.exports = multer({storage}).single("image");