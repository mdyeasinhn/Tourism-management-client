import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import AuthProviders from './Providers/AuthProviders'
import router from './routes/routes'
import { Toaster } from 'react-hot-toast'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
    <RouterProvider router={router} />
    <Toaster />
    </AuthProviders>
  </React.StrictMode>,
)
