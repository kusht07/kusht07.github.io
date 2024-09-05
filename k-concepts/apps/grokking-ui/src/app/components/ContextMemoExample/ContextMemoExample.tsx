import React, { createContext, useContext, useState, useMemo } from 'react';

// Create a context for the theme
const ThemeContext = createContext('light');

// Component that uses the context
const ThemedButton = () => {
  const theme = useContext(ThemeContext);
  return (
    <button className={`px-4 py-2 rounded-md ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'} transition-colors duration-300`}>
      I'm a {theme} themed button
    </button>
  );
};

// Component that uses useMemo
const ExpensiveComputation = ({ num }: { num: number }) => {
  const expensiveValue = useMemo(() => {
    console.log('Computing expensive value...');
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += num;
    }
    return result;
  }, [num]);

  return <div className="text-lg font-semibold">Result: {expensiveValue}</div>;
};

export const ContextMemoExample: React.FC = () => {
  const [theme, setTheme] = useState('light');
  const [num, setNum] = useState(1);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Context API and useMemo Example</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Context API Demo</h3>
          <p className="mb-4 text-gray-600">This example demonstrates the use of React Context API for theme management. The button below changes its appearance based on the current theme.</p>
          <ThemeContext.Provider value={theme}>
            <div className="flex items-center justify-center space-x-4">
              <ThemedButton />
              <button onClick={toggleTheme} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
                Toggle Theme
              </button>
            </div>
          </ThemeContext.Provider>
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2 text-gray-700">useMemo Demo</h3>
          <p className="mb-4 text-gray-600">This example shows how useMemo can be used to optimize performance by memoizing expensive computations. The result updates only when the input number changes.</p>
          <div className="flex flex-col items-center">
            <ExpensiveComputation num={num} />
            <button 
              onClick={() => setNum(prev => prev + 1)} 
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
            >
              Increment Number ({num})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContextMemoExample;