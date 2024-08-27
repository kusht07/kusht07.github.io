import React, { useState, useEffect } from 'react';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                setTodos(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div className='todo-app'>Hello World!</div>
    );
};

export default TodoApp;
