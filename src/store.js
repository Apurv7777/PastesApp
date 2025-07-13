import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteSlice'
import themeReducer from './redux/themeSlice'

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
    theme: themeReducer,
  },
})