import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDK04xzB5PEPpRwtp13zw8tplwlf3UAQR8',

  authDomain: 'dojo-b7414.firebaseapp.com',

  projectId: 'dojo-b7414',

  storageBucket: 'dojo-b7414.appspot.com',

  messagingSenderId: '326087778786',

  appId: '1:326087778786:web:c99a53da47dfe9f9ced9bb',
}

firebase.initializeApp(firebaseConfig)

const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

const timestamp = firebase.firestore.Timestamp

export { projectAuth, projectFirestore, projectStorage, timestamp }
