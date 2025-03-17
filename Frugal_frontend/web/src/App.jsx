import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import UserRoutes from './Routes/UserRoutes'
import { ToastContainer } from 'react-toastify'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ToastContainer position="top-right" autoClose={1500} />
      <Routes>
        <Route path='/*' element={<UserRoutes/>} ></Route>
      </Routes>
    </div>
  )
}

export default App
