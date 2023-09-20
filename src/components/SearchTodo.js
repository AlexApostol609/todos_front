import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchTodo = ({ match }) => {
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    const todoId = match.params.id;
    if (todoId) {
      fetchTodo(todoId);
    }
  }, [match.params.id]);

  const fetchTodo = (todoId) => {
    axios
      .get(`http://localhost:4000/todo/${todoId}`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching todo:', error);
      });
  };


  return (
    <div>
      <h2>View Todo</h2>
      <div>
        <strong>ID:</strong> {todo.id}
      </div>
      <div>
        <strong>Title:</strong> {todo.title}
      </div>
      <div>
        <strong>Description:</strong> {todo.description}
      </div>
      <div>
        <strong>Completed:</strong> {todo.done ? 'Yes' : 'No'}
      </div>
    </div>
  );
};

export default SearchTodo;
