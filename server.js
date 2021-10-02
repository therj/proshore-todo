require('dotenv').config();

const port = process.env.PORT;

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const todos = require('./routes/todos');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const mongoose = require('./config/database');
// connect to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(cors());
app.use(logger('dev'));

app.use('/todos', todos);
app.get('/', function (req, res) {
  res.render('index', { title: 'Proshore', app: 'Todo' });
});

// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  console.log(err.status, err.message);

  if (err.status === 404) res.status(404).json({ status: 'error', message: 'Not found' });
  else if (err.status && err.message) res.status(err.status).json({ status: 'error', message: err.message });
  else res.status(500).json({ status: 'error', message: 'Internal error occurred' });
});

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});
