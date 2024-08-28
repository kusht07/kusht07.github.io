import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="max-w-4xl w-full space-y-8">
        <div className={`p-8 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex justify-between items-center mb-8">
            <h1 className={`text-4xl font-bold text-center ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>Todo App</h1>
            <ToggleSwitch isDark={isDarkMode} toggleDarkMode={toggleDarkMode} />
          </div>
          <form onSubmit={handleSubmit} className="mb-8">
            <div className={`flex items-center border-b py-2 ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter a new todo"
                className={`appearance-none bg-transparent border-none w-full mr-3 py-2 px-3 leading-tight focus:outline-none text-xl ${isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-700 placeholder-gray-500'}`}
              />
              <button
                type="submit"
                className={`flex-shrink-0 text-lg border-4 py-2 px-4 rounded ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 text-white' : 'bg-blue-700 hover:bg-blue-500 border-blue-700 hover:border-blue-500 text-white'}`}
              >
                Add Todo
              </button>
            </div>
          </form>
          <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
            <ul className="space-y-3">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`rounded-lg p-4 shadow-sm transition duration-150 ease-in-out flex justify-between items-center ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="form-checkbox h-5 w-5 text-blue-600 rounded mr-3 cursor-pointer"
                    />
                    <span className={`text-lg ${todo.completed ? 'line-through text-gray-500' : ''} ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                      {todo.text}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;