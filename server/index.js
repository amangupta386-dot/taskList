const cors = require("cors"); // Import cors
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const router = express.Router();
require("dotenv");

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies

// MongoDB Connection

  connectDB = async () =>{
    const {connection} = await mongoose.connect(process.env.MONGO_URI);
 
    console.log(`Mongo db is connected with ${connection.host}`);
 }
 connectDB();

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: String, required: true },
  priority: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

// Routes
router.post("/addTask", async (req, res) => {
  try {
    const { title, description, deadline, priority } = req.body;
    const newTask = await Task.create({ title, description, deadline, priority });
    res.status(200).send({ message: "Task Added", task: newTask });
  } catch (err) {
    res.status(500).send({ message: "Error adding task", error: err.message });
  }
});

router.get("/getTask", async (req, res) => {
  try {
    const dataList = await Task.find();
    res.status(200).send({ data: dataList });
  } catch (err) {
    res.status(500).send({ message: "Error fetching tasks", error: err.message });
  }
});

// Use Router
app.use("/api", router);

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
