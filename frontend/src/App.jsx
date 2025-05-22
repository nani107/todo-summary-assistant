import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/todos`);
      setTodos(res.data.map((t) => ({ ...t, editing: false })));
    } catch (err) {
      console.error('Failed to fetch todos:', err.message);
    }
  };

  const handleAdd = async () => {
    try {
      if (!task.trim()) return;
      await axios.post(`${API}/todos`, { task });
      setTask('');
      fetchTodos();
    } catch (err) {
      console.error('Failed to add todo:', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/todos/${id}`);
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo:', err.message);
    }
  };

  const handleSummarize = async () => {
    try {
      const res = await axios.post(`${API}/summarize`);
      setStatus(`✅ Summary sent to Slack: ${res.data.summary}`);
    } catch (err) {
      console.error('Failed to send summary:', err.message);
      setStatus('❌ Failed to send summary.');
    }
  };

  const handleEditToggle = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, editing: !todo.editing } : { ...todo, editing: false }
      )
    );
  };

  const handleEditSave = async (id, newTask) => {
    try {
      await axios.put(`${API}/todos/${id}`, { task: newTask });
      fetchTodos();
    } catch (err) {
      console.error('Failed to update todo:', err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h1>📝 Todo Summary Assistant</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Enter new task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: '0.5rem', width: '70%', marginRight: '0.5rem' }}
        />
        <button onClick={handleAdd} style={{ padding: '0.5rem 1rem' }}>Add</button>
      </div>

      <ul style={{ paddingLeft: 0 }}>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{
              listStyle: 'none',
              border: '1px solid #ccc',
              padding: '0.5rem',
              marginBottom: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fff'
            }}
          >
            {todo.editing ? (
              <>
                <input
                  type="text"
                  value={todo.task}
                  onChange={(e) =>
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todo.id ? { ...t, task: e.target.value } : t
                      )
                    )
                  }
                  style={{ flex: 1, marginRight: '0.5rem' }}
                />
                <button
                  onClick={() => {
                    handleEditSave(todo.id, todo.task);
                    handleEditToggle(todo.id);
                  }}
                >
                  ✅
                </button>
              </>
            ) : (
              <>
                <span>{todo.task}</span>
                <div>
                  <button
                    onClick={() => handleEditToggle(todo.id)}
                    style={{ marginRight: '0.5rem' }}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    style={{ color: 'red', border: 'none', background: 'transparent' }}
                  >
                    🗑
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <button
        onClick={handleSummarize}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'green',
          color: 'white'
        }}
      >
        Summarize & Send to Slack
      </button>

      {status && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>}
    </div>
  );
}

export default App;
