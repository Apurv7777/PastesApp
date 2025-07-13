import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/themeSlice';
import sunIcon from "../assets/sun-icon.png";
import moonIcon from "../assets/moon-icon.png";

const ThemeToggle = () => {
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out active:scale-95"
    >
      {theme === 'dark' ? (
        // Sun icon for light mode
        <img 
          src={sunIcon} 
          alt="☀️" 
          width="20" 
          height="20"
          className="w-5 h-5 transition-transform duration-300 hover:rotate-45"
          />
        ) : (
            // Moon icon for dark mode
            <img 
            src={moonIcon} 
            alt="🌙"
            width="20" 
            height="20"
            className="w-5 h-5 transition-transform duration-300 hover:rotate-12 dark:invert"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
