import firebase from 'firebase/app'
import 'firebase/analytics'

if (process.env.NODE_ENV === 'production') {
  firebase.analytics()
}
