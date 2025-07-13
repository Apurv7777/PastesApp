import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: (() => {
    // Check for saved theme in localStorage or system preference
    const savedTheme = localStorage.getItem('pastesapp-theme');
    if (savedTheme) return savedTheme;
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })()
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('pastesapp-theme', state.theme);
      
      // Update document attributes for CSS
      const root = document.documentElement;
      root.setAttribute('data-theme', state.theme);
      
      if (state.theme === 'dark') {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
      } else {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('pastesapp-theme', state.theme);
      
      // Update document attributes for CSS
      const root = document.documentElement;
      root.setAttribute('data-theme', state.theme);
      
      if (state.theme === 'dark') {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
      } else {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
      }
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
