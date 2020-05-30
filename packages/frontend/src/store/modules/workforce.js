import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase/db'

export default {
  state: {
    workforce: [],
  },
  mutations: {
    setWorkforce: (state, workforce) => (state.workforce = workforce),
    ...vuexfireMutations,
  },
  actions: {
    workforceRef: firestoreAction(({ bindFirestoreRef, rootGetters }) =>
      bindFirestoreRef(
        'workforce',
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforces')
      )
    ),
  },
  getters: {
    getWorkforce: (state) => state.workforce,
  },
}
