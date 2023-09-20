import React from 'react';
import axios from 'axios';

const DeleteTodo = ({ todoId, onDelete }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/todo/${todoId}`)
      .then(() => {
        onDelete(todoId); // Notify the parent component that the todo was deleted
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteTodo;