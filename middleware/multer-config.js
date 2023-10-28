const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');  // images est le dossier où seront stockées les images
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];  // Retire les espaces et prend le nom original
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');
