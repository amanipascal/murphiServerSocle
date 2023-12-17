const router = require('express').Router()
const { addTodo, deleteTodo, getTodo, getTodos, updateTodo} = require('../controllers/todoController');

router.get('/todos', getTodos);
router.get('/todo/:id', getTodo);
router.post('/todo', addTodo)
router.put('/todo/:id', updateTodo)
router.delete('/todo/:id', deleteTodo)

module.exports = router