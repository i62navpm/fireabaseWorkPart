import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase/db'

export default {
  state: {
    workers: [],
  },
  mutations: {
    setWorkforce: (state, workers) => (state.workers = workers),
  },
  actions: {
    workforceRef: firestoreAction(({ bindFirestoreRef, rootGetters }) =>
      bindFirestoreRef(
        'workers',
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .orderBy('createdAt')
      )
    ),
    createWorker: firestoreAction(({ rootGetters }, worker) =>
      db
        .collection('users')
        .doc(rootGetters.getUser.email)
        .collection('workforce')
        .add(worker)
    ),
  },
  getters: {
    getWorkforce: (state) => state.workers,
  },
}
