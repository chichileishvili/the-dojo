import { useEffect, useState } from 'react'
import { projectFirestore } from '../firebase/config'
export const useDocument = (colletion, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const ref = projectFirestore.collection(colletion).doc(id)
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id })
          setError(null)
        } else {
          setError('no such document exists')
        }
      },
      (err) => {
        console.log(err)

        setError('failed to get  document')
      }
    )
    return () => unsubscribe()
  }, [colletion, id])
  return { document, error }
}
