const express = require('express');
const cors = require('cors');
const bearerToken = require('express-bearer-token');

const fs = require('fs');
const PORT = 2001;
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(bearerToken());

app.get('/', (req, res) => {
  let home = fs.readFileSync('home.html', 'utf-8');
  res.status(200).send(home);
});

app.use(express.static('Public'));

const { userRouter, uploadRouter, likeRouter } = require('./routers');
app.use('/media', uploadRouter);
app.use('/users', userRouter);
app.use('/like', likeRouter);

// app.get('/users', (req, res) => {
//   let scriptQuery = `select * from jcwdvl06.new_table`;

//   db.query(scriptQuery, (err, result) => {
//     if (err) res.status(500).send(err);
//     res.status(200).send(result);
//   });
// });

app.listen(PORT, () => console.log(`Running at Port:${PORT}`));
