import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { projectStorage } from '../../firebase/config'
import { projectFirestore } from '../../firebase/config'
import { useDocument } from '../../hooks/useDocument'

export default function Options() {
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { user } = useAuthContext()

  const changePfp = async (thumbnail) => {
    {
      user.photoURL === thumbnail && <p className='error'> you cant select same photo</p>
    }
    const addPath = `thumbnails/${user.uid}/${thumbnail.name}`
    const img = await projectStorage.ref(addPath).put(thumbnail)
    const imgUrl = await img.ref.getDownloadURL()
    await user.updateProfile({ photoURL: imgUrl })
    await projectFirestore.collection('users').doc(user.uid).set({
      photoURL: imgUrl,
      displayName: user.displayName,
      online: true,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    changePfp(thumbnail)
  }
  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)
    if (!selected) {
      setThumbnailError('please select a file')
      return
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('selected file must be image')
      return
    }
    if (selected.size > 100000) {
      setThumbnailError('image file size must be less then 100kb')
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
  }

  return (
    <form className='changepfp' onSubmit={handleSubmit}>
      <label>
        <span> update your profile thumbnail:</span>
        <input type='file' required onChange={handleFileChange} />
        {thumbnailError && <div className='error'> {thumbnailError}</div>}
      </label>
      <button className='btn'> Submit</button>
    </form>
  )
}
