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
            .orderBy('createdAt')
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
            .orderBy('createdAt')
        )
    ),
    createIncomeEvent: firestoreAction(
      ({ rootGetters, getters }, { year, month, events, workers }) => {
        const batch = db.batch()

        workers.forEach((workerId) => {
          events.forEach((event) => {
            const monthRef = db
              .collection('users')
              .doc(rootGetters.getUser.email)
              .collection('workforce')
              .doc(workerId)
              .collection('income')
              .doc(year)
              .collection(month)
              .doc()
            batch.set(monthRef, {
              ...event,
              amount:
                getters.getWorkerRef(workerId)[event.salary] || event.amount,
            })
          })
        })

        return batch.commit()
      }
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
      ({ rootGetters }, { workerId, year, month, events }) => {
        const batch = db.batch()
        events.forEach((event) => {
          const monthRef = db
            .collection('users')
            .doc(rootGetters.getUser.email)
            .collection('workforce')
            .doc(workerId)
            .collection('outcome')
            .doc(year)
            .collection(month)
            .doc()
          batch.set(monthRef, event)
        })

        return batch.commit()
      }
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
