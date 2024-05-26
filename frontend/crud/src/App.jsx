import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import { Toaster } from "react-hot-toast";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './Home';
import Profile from './Profile';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
        }/>
        <Route path='/profile/:id' element={
        <ProtectedRoute>
        <Profile/>
        </ProtectedRoute>
        }/>
        <Route path='/register' element={
        <PublicRoute>
        <SignUp/>
        </PublicRoute>
        }/>
        <Route path='/login' element={
        <PublicRoute>
      <Login/>
      </PublicRoute>
        }/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App