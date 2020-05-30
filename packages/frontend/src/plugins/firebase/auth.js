import firebase from 'firebase/app'
import 'firebase/auth'

firebase.auth().languageCode = 'es'

export const auth = firebase.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
