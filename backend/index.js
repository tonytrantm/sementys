const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const bodyParser = require('body-parser');
const cookieParse = require('cookie-parser');
const morganMiddleware = require('./middelware/logger');
const UserRouter = require('./routes/user');

const port = process.env.PORT || 3002;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParse());
app.use(morganMiddleware);
app.use('/user', UserRouter);

app.use(express.static('uploads'));

const server = app.listen(port, () => {
  console.log(`THM App running on port ${port}.`);
});

module.exports = server;
