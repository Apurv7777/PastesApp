import './App.css'
import AskAI from './components/AskAI'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:'/askAI',
      element:
      <div>
        <Navbar />
        <AskAI />
      </div>
    },
    {
      path:'/pastes',
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    },
  ]
)

function App() {

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
