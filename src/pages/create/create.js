import { useEffect, useState } from 'react'
import './create.css'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError(null)

    if (!category) {
      setFormError('please select a project category')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('please sign to a project at least one user')
      return
    }

    console.log(name, details, dueDate, category, assignedUsers)
  }

  return (
    <div className='create-form'>
      {' '}
      <h2 className='page-title'>Create a new project </h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input type='text' required onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Project details:</span>
          <input
            type='text'
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label>
          <span>Set due dueDate:</span>
          <input
            type='date'
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category</span>
          <Select onChange={(option) => setCategory(option)} options={categories} />
        </label>
        <label>
          <span>Assign to:</span>
          <Select options={users} onChange={(option) => setAssignedUsers(option)} isMulti />
        </label>
        <button className='btn'> Add Project</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
