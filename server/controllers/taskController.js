const Task = require('../models/task'); // Replace with the correct path to your Task model

const taskController = {
  // Create a task
  createTask: async (req, res) => {
    try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error });
    }
  },

  // Get all tasks with pagination
  getTasks: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const tasks = await Task.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const total = await Task.countDocuments();
      res.json({ tasks, total });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error });
    }
  },

  // Update a task by ID
  updateTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error });
    }
  },

  // Delete a task by ID
  deleteTask: async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error });
    }
  },
};

module.exports = taskController;
