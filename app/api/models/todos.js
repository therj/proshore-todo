const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  short_description: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Number, //epoch time!
    trim: true,
    required: true
  },
  done: {
    type: Boolean,
    required: true
  }
});

TodoSchema.pre('save', function(next) {
  let now = Math.round(Number(new Date()) / 1000); //SECONDS!
  if (this.date < now) {
    let err = new Error('Bad Request. Past date cannot be accepted!');
    err.status = 400;
    return next(err);
  }
  next();
});

module.exports = mongoose.model('Todo', TodoSchema);
