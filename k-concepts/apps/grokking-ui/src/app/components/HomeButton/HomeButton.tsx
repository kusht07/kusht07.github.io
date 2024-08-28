import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 left-4 bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
    >
      Home
    </button>
  );
};

export default HomeButton;