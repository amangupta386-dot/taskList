import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    priority: "",
  });

  const [TableData, SetTableData] = useState({})
 
  useEffect(()=>{
    getTask();
  }, [])

  const getTask = async (event) => {
    const res = await axios.get("http://localhost:5000/getTask");
    SetTableData(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Task added:", formData);

    // Reset form fields
    setFormData({
      title: "",
      description: "",
      deadline: "",
      priority: "",
    });

    await axios.post("http://localhost:5000/addTask",{
      formData
    })

  };

  return (
   <>
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <TextField
        label="Title"
        name="title"
        variant="outlined"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        variant="outlined"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Deadline"
        name="deadline"
        variant="outlined"
        value={formData.deadline}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Priority"
        name="priority"
        variant="outlined"
        value={formData.priority}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <button type="submit" style={{ marginTop: "20px" }}>
        Add Task
      </button>
    </form>

    {TableData && TableData.title }
    {TableData && TableData.description }
    {TableData && TableData.deadline }
    {TableData && TableData.priority }

   </>
  );
}

export default App;
