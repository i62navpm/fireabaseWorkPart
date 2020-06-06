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
      ({ rootGetters }, { workerId, year, month, event }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(workerId)
          .collection('income')
          .doc(year)
          .collection(month)
          .add(event)
    ),
    updateIncomeEvent: firestoreAction(
      ({ rootGetters }, { workerId, id, year, month, event }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(workerId)
          .collection('income')
          .doc(year)
          .collection(month)
          .doc(id)
          .update(event)
    ),
    removeIncomeEvent: firestoreAction(
      ({ rootGetters }, { workerId, id, year, month }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(workerId)
          .collection('income')
          .doc(year)
          .collection(month)
          .doc(id)
          .delete()
    ),
    createOutcomeEvent: firestoreAction(
      ({ rootGetters }, { workerId, year, month, event }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(workerId)
          .collection('outcome')
          .doc(year)
          .collection(month)
          .add(event)
    ),
    updateOutcomeEvent: firestoreAction(
      ({ rootGetters }, { workerId, id, year, month, event }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(workerId)
          .collection('outcome')
          .doc(year)
          .collection(month)
          .doc(id)
          .update(event)
    ),
    removeOutcomeEvent: firestoreAction(
      ({ rootGetters }, { workerId, id, year, month }) =>
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('workforce')
          .doc(workerId)
          .collection('outcome')
          .doc(year)
          .collection(month)
          .doc(id)
          .delete()
    ),
  },
  getters: {
    getWorkerMovements: (state) => state,
  },
}
