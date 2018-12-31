if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const todos = require('./routes/todos');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const mongoose = require('./config/database');

// connect to mongodb
mongoose.connection.on(
  'error',
  console.error.bind(console, 'MongoDB connection error:')
);
app.use(cors());
app.use(logger('dev'));

app.use('/todos', todos);

app.get('/', function(req, res) {
  res.json({ test: 'Build ToDo with NodeJS!' });
});

// handle 404 error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log(err);
  if (err.status === 404) res.status(404).json({ message: 'Not found' });
  else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

app.listen(port, () => {
  console.log(`Node server listening on port ${port}`);
});
