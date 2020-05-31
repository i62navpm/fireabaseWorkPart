import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase/db'

export default {
  state: {
    worker: {},
  },
  mutations: {},
  actions: {
    workerRef: firestoreAction(({ bindFirestoreRef, rootGetters }, id) =>
      bindFirestoreRef(
        'worker',
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(id)
      )
    ),
  },
  getters: {
    getWorker: (state) => state.worker,
  },
}
