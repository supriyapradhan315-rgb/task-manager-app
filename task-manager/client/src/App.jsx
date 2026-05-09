import { useState } from "react";
import axios from "axios";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = async () => {
    if (!task.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title: task,
          completed: false,
        }
      );

      setTasks([res.data, ...tasks]);
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
  };

  const toggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id
        ? { ...task, completed: !task.completed }
        : task
    );

    setTasks(updated);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "42px",
          }}
        >
          Task Manager 🚀
        </h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "25px",
          }}
        >
          <input
            type="text"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "10px",
              border: "none",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={addTask}
            style={{
              padding: "14px 18px",
              border: "none",
              borderRadius: "10px",
              background: "#3b82f6",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            No tasks added yet
          </p>
        ) : (
          tasks.map((t) => (
            <div
              key={t.id}
              style={{
                background: "#334155",
                padding: "15px",
                borderRadius: "12px",
                marginBottom: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                onClick={() => toggleComplete(t.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: t.completed
                    ? "line-through"
                    : "none",
                  color: t.completed ? "#22c55e" : "white",
                  fontSize: "17px",
                }}
              >
                {t.title}
              </span>

              <button
                onClick={() => deleteTask(t.id)}
                style={{
                  background: "#ef4444",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;