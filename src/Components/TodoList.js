import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'; 
import './TodoList.css';

const TodoList = () => {
  const [userInput, setUserInput] = useState('');
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('todoList')) || [];
    setList(storedList);
  }, []);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  const addItem = () => {
    if (userInput.trim()) {
      setList([...list, { id: Math.random(), value: userInput, completed: false }]);
      setUserInput('');
    }
  };

  const toggleComplete = (id) => {
    setList(list.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id));
  };

  const startEdit = (id, value) => {
    setEditId(id);
    setEditValue(value);
  };

  const saveEdit = () => {
    if (editValue.trim()) {
      setList(list.map(item => item.id === editId ? { ...item, value: editValue } : item));
      setEditId(null);
      setEditValue('');
    }
  };

  const filteredList = () => {
    switch (filter) {
      case 'completed':
        return list.filter(item => item.completed);
      case 'incomplete':
        return list.filter(item => !item.completed);
      default:
        return list;
    }
  };

  return (
    <div>
      <Navbar /> {}
      <div className="content-container">
        <div id="home" className="todo-list-container">
          <h1 className="todo-list-title">Todo App</h1>
          <div className="input-group">
            <input
              type="text"
              className="todo-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Add a new task..."
            />
            <button className="add-button" onClick={addItem}>Add</button>
          </div>
          <div className="filter-buttons">
            <button
              className={`filter-button ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button
              className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed Tasks
            </button>
            <button
              className={`filter-button ${filter === 'incomplete' ? 'active' : ''}`}
              onClick={() => setFilter('incomplete')}
            >
              Incomplete Tasks
            </button>
          </div>
          <ul className="task-list">
            {filteredList().map(item => (
              <li key={item.id} className="task-item">
                {editId === item.id ? (
                  <div className="edit-group">
                    <input
                      type="text"
                      className="edit-input"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button className="save-button" onClick={saveEdit}>Save</button>
                    <button className="cancel-button" onClick={() => setEditId(null)}>Cancel</button>
                  </div>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      className="task-checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(item.id)}
                    />
                    <span className={`task-text ${item.completed ? 'completed' : ''}`} onClick={() => toggleComplete(item.id)}>
                      {item.value}
                    </span>
                    <div className="task-actions">
                      <button onClick={() => startEdit(item.id, item.value)}>Edit</button>
                      <button onClick={() => deleteItem(item.id)}>Delete</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
