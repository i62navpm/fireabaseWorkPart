import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase/db'

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
            .collection(month)
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
            .collection(month)
        )
    ),
    createIncomeEvent: firestoreAction(
      ({ rootGetters }, { id, year, month, event }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(id)
          .collection('income')
          .doc(year)
          .collection(month)
          .add(event)
    ),
    // createWorker: firestoreAction(({ rootGetters }, worker) => {}),
    // updateWorker: firestoreAction(({ rootGetters }, { id, data }) => {}),
  },
  getters: {
    getWorkerMovements: (state) => state,
  },
}
