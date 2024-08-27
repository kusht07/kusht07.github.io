import React from 'react';

interface ToggleSwitchProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isDark, toggleDarkMode }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" className="sr-only" checked={isDark} onChange={toggleDarkMode} />
        <div className={`block w-14 h-8 rounded-full ${isDark ? 'bg-blue-600' : 'bg-gray-600'}`}></div>
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isDark ? 'transform translate-x-6' : ''}`}></div>
      </div>
      <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </div>
    </label>
  );
};

export default ToggleSwitch;