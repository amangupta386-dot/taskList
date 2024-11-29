const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
