import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import TodoApp from './components/TodoApp/TodoApp';
import DataTables from './components/DataTables/DataTables';
import LoadingAnimation from './components/Animations/LoadingAnimation';

export function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
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
        <Route path="/search" element={<DataTables />} />
        <Route path="/datatables" element={<DataTables />} />
      </Routes>
    </Router>
  );
}

export default App;
