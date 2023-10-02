import './project.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './projectSummary'

export default function Project() {
  const { id } = useParams()
  const { error, document } = useDocument('projects', id)
  if (error) {
    return <div className='error'> {error}</div>
  }

  if (!document) {
    return <div className='loading'>Loading...</div>
  }
  return (
    <div className='project-details'>
      {' '}
      <h1>
        <ProjectSummary project={document} />
      </h1>
    </div>
  )
}
