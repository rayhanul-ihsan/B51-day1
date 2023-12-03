const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); 
      const fileImage = path.extname(file.originalname);
      console.log('fileImage:', fileImage);
      cb(null, file.fieldname + '-' + uniqueSuffix + fileImage);
    }
  })
  
  const upload = multer({ storage });

  module.exports = upload;