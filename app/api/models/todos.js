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

module.exports = mongoose.model('Todo', TodoSchema);
