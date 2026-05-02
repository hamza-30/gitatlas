import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import Analyzer from './pages/Analyzer'
import Compare from './pages/Compare'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Layout from './Layout'
import SearchContextProvider from './context/SearchContextProvider'

let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "analyzer/:username",
          element: <Analyzer />,
        }, 
        {
          path: "compare",
          element: <Compare />,
        }
      ]
    }
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchContextProvider>
      <RouterProvider router={router}/>
    </SearchContextProvider>
  </StrictMode>,
)
