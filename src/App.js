import './App.css'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/signup'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login/login'
import Project from './pages/project/project'
import Create from './pages/create/create'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
function App() {
  return (
    <div className='App'>
      <Sidebar />
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route path='create' element={<Create />} />
          <Route path='projects/:id' element={<Project />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
