const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Daya@123',
  database: 'jcwdvl06',
  multipleStatements: true,
});

module.exports = {
  db,
};
