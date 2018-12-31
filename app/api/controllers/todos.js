const todoModel = require('../models/todos');

module.exports = {
  getById: function(req, res, next) {
    console.log(req.body);
    todoModel.findById(req.params.todoId, function(err, todoInfo) {
      if (err) next(err);
      else {
        res.json({
          status: 'success',
          message: 'Todo found!!!',
          data: { todo: todoInfo }
        });
      }
    });
  },
  getAll: function(req, res, next) {
    let todosList = [];
    todoModel.find({}, function(err, todos) {
      if (err) next(err);
      else {
        for (let todo of todos) {
          todosList.push({
            id: todo._id,
            name: todo.name,
            short_description: todo.short_description,
            date: todo.date,
            done: todo.done
          });
        }
        res.json({
          status: 'success',
          message: "Here's Todo list",
          data: { todos: todosList }
        });
      }
    });
  },
  updateById: function(req, res, next) {
    // Model.findByIdAndUpdate(id, { $set: { name: 'jason bourne' }}, options, callback)
    todoModel.findByIdAndUpdate(
      req.params.todoId,
      {
        $set: {
          name: req.body.name,
          short_description: req.body.short_description,
          date: req.body.date,
          done: req.body.done
        }
      },
      // { name: req.body.name },
      function(err, todoInfo) {
        if (err) next(err);
        else {
          res.json({
            status: 'success',
            message: 'Todo updated successfully!!!',
            data: todoInfo
          });
        }
      }
    );
  },
  deleteById: function(req, res, next) {
    todoModel.findByIdAndRemove(req.params.todoId, function(err, todoInfo) {
      if (err) next(err);
      else {
        res.json({
          status: 'success',
          message: 'Todo deleted successfully!!!',
          data: todoInfo
        });
      }
    });
  },
  create: function(req, res, next) {
    todoModel.create(
      {
        name: req.body.name,
        short_description: req.body.short_description,
        date: req.body.date,
        time: req.body.time,
        done: false
      },
      function(err, resultTodo) {
        if (err) next(err);
        else
          res.json({
            status: 'success',
            message: 'Todo added successfully!!!',
            data: resultTodo
          });
      }
    );
  }
};
