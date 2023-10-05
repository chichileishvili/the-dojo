import './navbar.css'
import Temple from '../assets/temple.svg'
import { useLogout } from '../hooks/useLogout'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import Spinner from './spinner/spinner.component'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <img src={Temple} alt='dojo logo' />
          <span>The Dojo</span>
        </li>
        {!user && (
          <>
            <li>
              <Link to='/login'> Login</Link>
            </li>
            <li>
              {' '}
              <Link to='/signup'> Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            {' '}
            {!isPending && (
              <button className='btn' onClick={logout}>
                {' '}
                Logout
              </button>
            )}
            {isPending && (
              <button className='btn' disabled>
                {' '}
                <Spinner />
              </button>
            )}
            {user && (
              <Link to='/options'>
                <button className='btn'>Settings</button>
              </Link>
            )}
          </li>
        )}
      </ul>
    </div>
  )
}
