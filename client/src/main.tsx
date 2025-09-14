import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Outlet, RouterProvider } from 'react-router'
import { router } from './Routes'
import { Router } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />      
  </StrictMode>,
)
