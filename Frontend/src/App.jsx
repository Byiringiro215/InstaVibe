import { useState } from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './Context/AuthContext'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './Pages/Login/Login'
import SignUp from './Pages/Signup/SignUp'
import './App.css'
import Home from './Pages/Home/Home'


function App() {
const {authUser}=useAuthContext();

  return <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={authUser ? <Home/> : <Navigate to={"/login"}/>} />
        <Route path='/login' element={authUser ? <Navigate to="/" /> :<Login/>}/>
        <Route path='/signup' element={authUser ? <Navigate to="/" /> :<SignUp/>}/>
      </Routes>
      <Toaster/>
  </div>
  
}

export default App
