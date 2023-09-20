import React, { useState } from 'react';
import axios from 'axios';


const AddTodo = ({ onAdd }) => {
    const [newTodo, setNewTodo] = useState({
        title: '',
        description: '',
        done: false, // Initialize as a boolean
    });

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        const inputValue = type === 'checkbox' ? e.target.checked : value;
        setNewTodo({ ...newTodo, [name]: inputValue });
    };

    const handleSubmit = () => {
        axios
            .post('http://localhost:4000/todo', newTodo)
            .then((response) => {
                onAdd(response.data);
                setNewTodo({
                    title: '',
                    description: '',
                    done: "",
                });
            })
            .catch((error) => {
                console.error('Error adding todo:', error);
            });
    };

    return (
        <div>
            <h2>Add Todo</h2>
            <div className="form-group">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={newTodo.title}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newTodo.description}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label>
                    Completed:{' '}
                    <input
                        type="checkbox"
                        name="done"
                        checked={newTodo.done}
                        onChange={handleInputChange}
                    />
                </label>
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Add
            </button>
        </div>
    );
};



export default AddTodo;