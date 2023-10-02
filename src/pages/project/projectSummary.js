import Avatar from '../../components/avatar'
import './project.css'

export default function ProjectSummary({ project }) {
  return (
    <div>
      <div className='project-summary'>
        <h2 className='page-title'></h2>
        <p className='due-date'>Project due date {project.dueDate.toDate().toDateString()}</p>
        <p className='details'>{project.details}</p>
        <h4>project is assigned to:</h4>
        <div className='assigned-users'>
          {project.assignedUsersList.map((user) => (
            <div key={user.id}>
              {' '}
              <Avatar src={user.photoURL} />{' '}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
