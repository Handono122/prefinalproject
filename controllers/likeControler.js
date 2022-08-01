const { db } = require('../database');

module.exports = {
  likeFile: (req, res) => {
    let { idalbum, iduser } = req.body;
    let insertQuery = `insert into like value (null, ${db.escape(idalbum)}, iduser = ${db.escape(iduser)});`;
    db.query(insertQuery, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send('success');
    });
  },
};
