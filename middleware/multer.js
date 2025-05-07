// middleware/multer.js
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); 
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
      return cb(new Error('Only .jpg, .jpeg, .png images are allowed'));
    }
    cb(null, true);
  }
});


module.exports = upload;
