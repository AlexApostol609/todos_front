import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import DeleteTodo from './components/DeleteTodo';

function App() {
  const [todos, setTodos] = useState([]);
  const [deleteTodoId, setDeleteTodoId] = useState('');
  const [searchTodoId, setSearchTodoId] = useState('');
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get('http://localhost:4000/todo')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todos:', error);
      });
  };

  const addTodo = (newTodo) => {
    axios
      .post('http://localhost:4000/todo', newTodo)
      .then((response) => {
        setTodos([...todos, response.data]);
      })
      .catch((error) => {
        console.error('Error adding todo:', error);
      });
  };
  
  

  const deleteTodo = () => {
    const todoId = parseInt(deleteTodoId);
    if (isNaN(todoId)) {
      console.error('Invalid Todo ID');
      return;
    }

    axios
      .delete(`http://localhost:4000/todo/${todoId}`)
      .then(() => {
        const updatedTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(updatedTodos);
        setDeleteTodoId('');
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  const searchTodo = () => {
    if (!searchTodoId) {
      console.error('Todo ID is required for search.');
      return;
    }

    axios
      .get(`http://localhost:4000/todo/${searchTodoId}`)
      .then((response) => {
        setSelectedTodo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todo:', error);
        setSelectedTodo(null);
      });
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="row">
        <div className="col-md-4">
          <AddTodo onAdd={addTodo} />
        </div>
        <div className="col-md-8">
          <h2>Todos</h2>
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <strong>Title:</strong> {todo.title}<br />
                <strong>Description:</strong> {todo.description}<br />
              </li>
            ))}
          </ul>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Todo ID to Delete"
              value={deleteTodoId}
              onChange={(e) => setDeleteTodoId(e.target.value)}
            />
            <button className="btn btn-danger" onClick={() => deleteTodo()}>
              Delete
            </button>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Todo ID to Search"
              value={searchTodoId}
              onChange={(e) => setSearchTodoId(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => searchTodo()}>
              Search
            </button>
          </div>
          {selectedTodo && (
            <div>
              <h2>View Todo</h2>
              <div>
                <strong>ID:</strong> {selectedTodo.id}
              </div>
              <div>
                <strong>Title:</strong> {selectedTodo.title}
              </div>
              <div>
                <strong>Description:</strong> {selectedTodo.description}
              </div>
              <div>
                <strong>Completed:</strong> {selectedTodo.done ? 'Yes' : 'No'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
