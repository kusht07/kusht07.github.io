import React, { useState, useEffect } from 'react';

const BasicAwait = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/todos');
                const data = await response.json();
                setData(data);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchTodos();
    }, []);

    return (
        <div>Basic Await</div>
    );
};

export default BasicAwait;
