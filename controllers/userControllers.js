const { db } = require('../database');
const {createToken} = require('../helper/createToken')
const Crypto = require('crypto')
const transporter = require('../helper/nodemailer')

module.exports = {
  getAllUsers: (req, res) => {
    let getQuery = 'select * from new_table';

    db.query(getQuery, (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
  getUserById: (req, res) => {
    let id = +req.params.id;
    let getQuery = `select * from new_table where idnew_table = ${id}`;
    db.query(getQuery, (err, result) => {
      if (err) return console.log(err);
      res.status(200).send(result);
    });
  },
  login: (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    let getQuery = `select * from new_table where (username = ${db.escape(username)} or email = ${db.escape(username)}) and password = ${db.escape(password)}`;

    db.query(getQuery, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ erroMessage: 'These credentials do not match our records' });
      }
      if (!result.length) {
        return res.status(400).send({ erroMessage: 'Password do not match' });
      }
      res.status(200).send(result);
    });
  },
  // register
  // edit
  // delete
  // buat fitur login, register, dan keep login dari front end menggunakan api yang kita buat sendiri
  register: (req, res) => {
    let { username, password, email } = req.body;
    password = Crypto.createHmac('sha1', 'hash123').update(password).digest('hex')
    console.log(password);
    let getQuery = `select * from new_table where username = ${db.escape(username)} or email = ${db.escape(email)} `;
    db.query(getQuery, (err, result) => {
      console.log(err, result);
      // if (err) {
      //   return console.log(err);
      //   return res.status(400).send({ erroMessage: 'username or email are already exiss' });
      // }
      if (result.length) {
        return res.status(400).send({ erroMessage: 'username or email are already exiss' });
      }

      let addQuery = `insert into new_table(username, password, email, stat) values (${db.escape(username)}, ${db.escape(password)}, ${db.escape(email)}, 'unverified')`;

      db.query(addQuery, (err, result) => {
        if (err) return console.log(err);

        res.status(200).send(result);
      });
      if (result.insertId) {
        let sqlGet = `select * from new_table where idnew_table= ${result.insertId}`;
        db.query(sqlGet,(err2, result2)=>{
          if(err2){
            console.log(err2)
            res.status(500).send(err2)
          }

          let(idnew_table, username, email, stat) =result2[0]
          let token = createToken({idnew_table, username, email, stat})

          let mail = {
            from: '<handonowarih122@yahoo.co.id>',
            to:`${email}`,
            subject: 'Account Verification',
            html:`<a href='http://localhost:3000/authentication/${token}'>click here for verif your account</a>`
          }
          transporter.sendMail(mail, (errMail, resMail)=> {
            if(errMail){
              console.log(errMail);
            
            res.status(500).send({message: 'registrasion fail', success: false,err:errMail })
          }
          res.status(200).send({message: 'register succes check your email', success: true })
          })
        })
      }
    });
  },
  verification:(req,res)=>{
    let updateQuery= `update new_table set status ='verivied' where idnew_table= ${req.user.idnew_table}`

    db.query(updateQuery, (err,result)=>{
      if(err){
        console.log(err)
        res.status(500).send(err)
      }
      res.status(200).send({message: 'verified Account', success:true})

    })

  },

  edit: (req, res) => {
    let arr = [];
    for (let key in req.body) {
      arr.push(`${key} = ${db.escape(req.body[key])}`);
    }

    let updateQuery = `update new_table set ${arr} where idnew_table = ${+req.params.id}`;

    db.query(updateQuery, (err, result) => {
      if (err) return console.log(err);

      let id = +req.params.id;
      let getQuery = `select * from new_table where idnew_table = ${id}`;
      db.query(getQuery, (err, result) => {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
      });
    });
  },
  delete: (req, res) => {
    let deleteQuery = `delete from new_table where idnew_table = ${+req.params.id}`;

    db.query(deleteQuery, (err, result) => {
      if (err) return console.log(err);

      res.status(200).send(result);
    });
  },
  // buat fitur login dan register dari front end menggunakan api yang kita buat sendiri
};
