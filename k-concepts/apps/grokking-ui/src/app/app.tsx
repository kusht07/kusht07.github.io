import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import TodoApp from './components/TodoApp/TodoApp';
import DataTables from './components/DataTables/DataTables';
import LoadingAnimation from './components/Animations/LoadingAnimation';
import SearchEngine from './components/SearchEngine/SearchEngine';
import HomeButton from './components/HomeButton/HomeButton';
import Leaderboard from './components/Xamples/Leaderboard';
import FlexboxDemo from './components/Xamples/FlexComponent';

const AppContent = () => {
  const location = useLocation();
  const showHomeButton = location.pathname !== '/';

  return (
    <>
      {showHomeButton && <HomeButton />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todo" element={<TodoApp />} />
        <Route path="/search" element={<SearchEngine />} />
        <Route path="/datatables" element={<DataTables />} />
      </Routes>
    </>
  );
};

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
      <AppContent />
    </Router>
  );
}

export default App;
