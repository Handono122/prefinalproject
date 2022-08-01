const { db } = require('../database');
const { uploader } = require('../helper/uploader');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

module.exports = {
  uploadComment: (req, res) => {
    try {
      let basePath = '/image';
      let { comment, media, filename, iduser } = req.body;
      media = Buffer.from(media, 'base64');
      fs.writeFileSync(path.join(__dirname, '..', 'Public', basePath, filename), media);
      const filepath = basePath + '/' + filename;

      // const upload = uploader(path, 'IMG').fields([{ name: 'media' }]);

      // upload(req, res, (error) => {
      //   if (error) {
      //     console.log(error);
      //     res.status(500).send(error);
      //   }
      //   const { file } = req.files;
      //   const filepath = file ? part + '/' + file[0].filename : null;

      //   let data = JSON.parse(req.body.data);
      //   data.image = filepath;

      // });
      let sqlInsert = `Insert into album values(null, ${db.escape(comment)},${db.escape(filepath)}, '${moment().format('YYYY-MM-DD HH:mm:ss')}', ${db.escape(iduser)})`;
      db.query(sqlInsert, (err, results) => {
        if (err) {
          console.log(err);
          fs.unlinkSync('./Public' + filepath);
          res.status(500).send(err);
        }
        res.status(200).send({ message: 'upload comment berhasil' });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getAllPosts: (req, res) => {
    let getQuery = 'select album.*, new_table.username, new_table.email, new_table.fullName from album join new_table on new_table.idnew_table = album.iduser';

    db.query(getQuery, (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
};
