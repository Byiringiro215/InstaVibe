import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './Context/AuthContext.jsx'
import { SocketContextProvider } from './Context/SocketContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
    <App />
    </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
  </BrowserRouter>
,
)
