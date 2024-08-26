import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TodoApp from './components/TodoApp';
import DataVisualizer from './components/DataVisualizer';
import DataTables from './components/DataTables';
import LoadingAnimation from './components/LoadingAnimation';

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/workingwithdata" element={<DataVisualizer />} />
        <Route path="/datatables" element={<DataTables />} />
      </Routes>
    </Router>
  );
}

export default App;
