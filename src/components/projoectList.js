import { Link } from 'react-router-dom'
import './projectList.css'
import Avatar from './avatar'

export default function ProjectList({ projects }) {
  return (
    <div className='project-list'>
      {projects.lenth === 0 && <p>no projects yet!</p>}
      {projects.map((projects) => (
        <Link to={`/projects/${projects.id}`} key={projects.id}>
          {' '}
          <h4>{projects.name}</h4>
          <p>Due by {projects.dueDate.toDate().toDateString()} </p>{' '}
          <div className='assigned-to'>
            <ul>
              {projects.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  {' '}
                  <Avatar src={user.photoURL} />{' '}
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  )
}
