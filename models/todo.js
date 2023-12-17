const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the TodoItem schema
const TodoSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

// Create the TodoItem model
const TodoModel = mongoose.model('Todo', TodoSchema);

// Export the TodoItem model
module.exports = TodoModel;