import Avatar from '../../components/avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
import './project.css'

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useNavigate()
  const handleClick = (e) => {
    deleteDocument(project.id)
    history('/')
  }
  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'></h2>
        <p> By: {project.createdBy.displayName}</p>
        <p className='due-date'>Project due date {project.dueDate.toDate().toDateString()}</p>
        <p className='details'>{project.details}</p>
        <h5>project is assigned to:</h5>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              {' '}
              <Avatar src={user.photoURL} />{' '}
            </div>
          ))}
        </div>
      </div>
      {user.uid == project.createdBy.id && (
        <button onClick={handleClick} className='btn'>
          {' '}
          Mark As Completed
        </button>
      )}
    </div>
  )
}
