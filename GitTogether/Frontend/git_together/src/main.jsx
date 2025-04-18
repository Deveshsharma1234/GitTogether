import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import {Provider} from 'react-redux'
import AppStore from './Redux/Store/AppStore'
import './index.css'

import appRouter from './Router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={AppStore}>
    <RouterProvider router = {appRouter}/>
    </Provider>
  </StrictMode>,
)
