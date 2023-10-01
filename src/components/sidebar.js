import './sidebar.css'
import Dashboard from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'
import Avatar from './avatar'
import { useAuthContext } from '../hooks/useAuthContext'
export default function Sidebar() {
  const { user } = useAuthContext()
  return (
    <div className='sidebar'>
      <div className='sidebar-content'>
        {user && (
          <div className='user'>
            <Avatar src={user.photoURL} />
            <p>hey {user.displayName}</p>
          </div>
        )}
        <nav className='links'>
          <ul>
            <li>
              <NavLink to='/'>
                <img src={Dashboard} alt='dashboard icon' />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/create'>
                <img src={AddIcon} alt='add project icon' />
                <span>New project</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
