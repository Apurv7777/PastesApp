import './App.css'
import AskAI from './components/AskAI'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setTheme } from './redux/themeSlice';
import { fetchPastes } from './redux/pasteSlice';
import { useEffect } from 'react';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element:
        <>
          <Navbar />
          <main className="w-full min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Home />
          </main>
        </>
    },
    {
      path: '/askAI',
      element:
        <>
          <Navbar />
          <main className="w-full min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <AskAI />
          </main>
        </>
    },
    {
      path: '/pastes',
      element:
        <>
          <Navbar />
          <main className="w-full min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <Paste />
          </main>
        </>
    },
    {
      path: '/pastes/:id',
      element:
        <>
          <Navbar />
          <main className="w-full min-h-[calc(100vh-4rem)] py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <ViewPaste />
          </main>
        </>
    },
  ]
)

function App() {
  const theme = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();

  // Initialize theme on app start and fetch pastes
  useEffect(() => {
    dispatch(setTheme(theme));
    dispatch(fetchPastes());
  }, [dispatch, theme]);

  return (
    <div className="w-screen h-screen overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-gray-900 transition-all duration-300">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
