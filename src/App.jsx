import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (validateTask()) {
      if (editingIndex !== null) {
        // Update existing task
        const updatedTasks = [...tasks];
        updatedTasks[editingIndex] = newTask.trim();
        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        // Add new task
        setTasks([...tasks, newTask.trim()]);
      }
      setNewTask("");
      setError("");
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setEditingIndex(null);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditingIndex(index);
    setError("");
  };

  const validateTask = () => {
    if (newTask.trim() === "") {
      setError("Task cannot be empty.");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Todo List</h1>
        <div className="form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <div className="end">
                <img src="/edit.png" onClick={() => editTask(index)}></img>
                <img src="/delete.png" onClick={() => removeTask(index)}></img>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
