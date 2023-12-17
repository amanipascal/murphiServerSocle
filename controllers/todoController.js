const Todo = require('../models/todo');


exports.getTodos = async (req, res) => {
    try {
      const todoItems = await Todo.find();
      res.json([ ...todoItems ]);
    } catch (err) {
      console.error(err);
    }
}


exports.getTodo = async (req, res) => {
    const { id } = req.params;
    try {
      const todoItem = await Todo.findById(id);
      res.json({ ...todoItem });
    } catch (err) {
      console.error(err);
    }
}

exports.addTodo = async (req, res) => {
    const { title } = req.body;
    const todoItem = new Todo({ title });
    try {
      const todo = await todoItem.save();
      // console.log({ ...todo.toJSON() })
      res.json({ ...todo.toJSON() });
      res.sendSSE({ data:  todo }, 'add-todo')
    } catch (err) {
      console.error(err);
    }
}

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
      const updatedTodo = await Todo.findByIdAndUpdate(id, { completed, updated_at: Date.now() });
      res.json({ ...updatedTodo.toJSON() });
      // res.sendSSE({ data:  updatedTodo }, 'update-todo')
    } catch (err) {
      console.error(err);
    }
}

exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Todo.findByIdAndDelete(id);
      res.json({ ...deleted.toJSON() });
      // res.sendSSE({ id:  deleted._id }, 'delete-todo')
    } catch (err) {
      console.error(err);
    }
}


