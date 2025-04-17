import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'

import appRouter from './Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {appRouter}/>
  </StrictMode>,
)
