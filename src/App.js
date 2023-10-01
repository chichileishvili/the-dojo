import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Signup from './pages/signup/signup'
import Dashboard from './pages/dashboard/dashboard'
import Login from './pages/login/login'
import Project from './pages/project/project'
import Create from './pages/create/create'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import OnlineUsers from './components/onlineUsers'
function App() {
  const { user, authIsReady } = useAuthContext()
  return (
    <div className='App'>
      {authIsReady && (
        <>
          {' '}
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route
                index
                element={(user && <Dashboard />) || (!user && <Navigate to='/login' />)}
              />
              <Route
                path='/login'
                element={(!user && <Login />) || (user && <Navigate to='/' />)}
              />
              <Route
                path='signup'
                element={(!user && <Signup />) || (user && <Navigate to='/' />)}
              />
              <Route
                path='create'
                element={(user && <Create />) || (!user && <Navigate to='/login' />)}
              />
              <Route
                path='projects/:id'
                element={(!user && <Navigate to='/login' />) || (user && <Project />)}
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </>
      )}
    </div>
  )
}

export default App
