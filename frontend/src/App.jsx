import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminPost from './pages/AdminPost'
import Notfound from './pages/Notfound'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<AdminLogin />} />
      <Route path='/admin/post' element={<AdminPost />} />
      <Route path='*' element={<Notfound />} />
    </Routes>
  )
}

export default App
