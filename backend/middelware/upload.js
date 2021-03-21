const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    const extention = file.originalname.split('.').pop();
    const newFilename = Date.now() + Math.round(Math.random() * 1E9) + '.' + extention;
    console.log(newFilename);
    cb(null, newFilename);
  },
});

const uploadMiddleware = multer({ storage: storage });

module.exports = uploadMiddleware;