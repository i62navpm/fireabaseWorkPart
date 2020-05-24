import * as firebase from 'firebase/app'
import 'firebase/auth'

firebase.auth().languageCode = 'es'

const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
