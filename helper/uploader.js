const multer = require('multer');
const fs = require('fs');

module.exports = {
  uploader: (directory, fileNamePreFix) => {
    //Lokasi penyimpanan file
    let defaultDir = './Public';

    //menyimpan file front end ke directory back end
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = defaultDir + directory;

        if (fs.existsSync(pathDir)) {
          console.log('Directory ada');
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
        }
      },
      filename: (req, file, cb) => {
        let ext = file.originalname.split('.');
        let filename = fileNamePreFix + Date.now() + '.' + ext[ext.length - 1];
        cb(null, filename);
      },
    });

    const fileFilter = (req, file, cb) => {
      const ext = /\.(jpg|jpeg|png|gif|pdf|txt|JPG|JPEG|PNG|GIF)/;
      if (!file.originalname.match(ext)) {
        return cb(new Error('Your file type are denied'), false);
      }
      cb(null, true);
    };
    return multer({
      storage,
      fileFilter,
    });
  },
};
