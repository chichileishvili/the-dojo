import { useReducer, useState, useEffect } from 'react'
import { projectFirestore } from '../firebase/config'
import { timestamp } from '../firebase/config'

let initialState = {
  document: null,
  isPending: false,
  error: null,
  succes: null,
}

const firestoreReduce = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { document: null, isPending: true, succes: false, error: null }
    case 'ADDED_DOCUMENT':
      return { ...state, isPending: false, document: action.payload, succes: true, error: null }
    case 'DELETED_DOCUMENT':
      return { isPending: false, document: null, succes: true, error: null }
    case 'ERROR':
      return { isPending: false, document: null, error: action.payload, succes: false }
    default:
      return state
  }
}
export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReduce, initialState)
  const [isCancelled, setIsCancelled] = useState(false)

  const ref = projectFirestore.collection(collection)

  const dispatchIfnotCanceled = (action) => {
    if (!isCancelled) {
      dispatch(action)
    }
  }
  const addDocument = async (doc) => {
    dispatch({ type: 'IS_PENDING' })
    try {
      const createdAt = timestamp.fromDate(new Date())
      const addedDocument = await ref.add({ ...doc, createdAt })
      dispatchIfnotCanceled({ type: 'ADDED_DOCUMENT', payload: addedDocument })
    } catch (error) {
      dispatchIfnotCanceled({ type: 'ERROR', payload: error.message })
    }
  }
  const deleteDocument = async (id) => {
    dispatch({ type: 'IS_PENDING' })

    try {
      await ref.doc(id).delete()
      dispatchIfnotCanceled({ type: 'DELETED_DOCUMENT' })
    } catch (error) {
      dispatchIfnotCanceled({ type: 'ERROR', payload: 'couldnt delete' })
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { addDocument, deleteDocument, response }
}
