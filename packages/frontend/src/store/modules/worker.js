import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase/db'

function serializeFn({ year, month }) {
  return (snapshot) => ({
    date: `${snapshot.id}-${month}-${year}`,
    ...snapshot.data(),
  })
}

export default {
  state: {
    income: [],
    outcome: [],
  },
  mutations: {},
  actions: {
    incomeRef: firestoreAction(
      ({ bindFirestoreRef, rootGetters }, { id, year, month }) =>
        bindFirestoreRef(
          'income',
          db
            .collection('users')
            .doc(rootGetters.getUser.email)
            .collection('workforce')
            .doc(id)
            .collection('income')
            .doc(year)
            .collection(month),
          { serialize: serializeFn({ year, month }) }
        )
    ),
    outcomeRef: firestoreAction(
      ({ bindFirestoreRef, rootGetters }, { id, year, month }) =>
        bindFirestoreRef(
          'outcome',
          db
            .collection('users')
            .doc(rootGetters.getUser.email)
            .collection('workforce')
            .doc(id)
            .collection('outcome')
            .doc(year)
            .collection(month),
          { serialize: serializeFn({ year, month }) }
        )
    ),
    // createWorker: firestoreAction(({ rootGetters }, worker) => {}),
    // updateWorker: firestoreAction(({ rootGetters }, { id, data }) => {}),
  },
  getters: {
    getWorkerMovements: (state) => state,
  },
}
