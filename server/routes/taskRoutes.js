const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController'); // Adjust the path

// Route to create a task
router.post('/', taskController.createTask);

// Route to get tasks with pagination
router.get('/', taskController.getTasks);

// Route to update a task by ID
router.put('/:id', taskController.updateTask);

// Route to delete a task by ID
router.delete('/:id', taskController.deleteTask);

module.exports = router;
