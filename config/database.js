//Set up mongoose connection
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const mongoose = require('mongoose');
const mongoDB = process.env.mongoDB;
mongoose.connect(
  mongoDB,
  { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;
// deprecated method!
mongoose.set('useFindAndModify', false);

module.exports = mongoose;
