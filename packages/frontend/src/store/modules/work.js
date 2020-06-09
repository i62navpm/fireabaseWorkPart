import { firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase/db'

export default {
  state: {
    works: [],
  },
  mutations: {
    setWork: (state, works) => (state.works = works),
  },
  actions: {
    workRef: firestoreAction(({ bindFirestoreRef, rootGetters }) =>
      bindFirestoreRef(
        'works',
        db
          .collection('users')
          .doc(rootGetters.getUser.email)
          .collection('work')
          .orderBy('createdAt')
      )
    ),
    getWorkRef: firestoreAction(({ rootGetters }, id) =>
      db
        .collection('users')
        .doc(rootGetters.getUser.email)
        .collection('work')
        .doc(id)
    ),
    createWork: firestoreAction(({ rootGetters }, work) =>
      db
        .collection('users')
        .doc(rootGetters.getUser.email)
        .collection('work')
        .add(work)
    ),
    removeWork: firestoreAction(({ rootGetters }, id) =>
      db
        .collection('users')
        .doc(rootGetters.getUser.email)
        .collection('work')
        .doc(id)
        .delete()
    ),
    updateWork: firestoreAction(({ rootGetters }, { id, data }) => {
      db.collection('users')
        .doc(rootGetters.getUser.email)
        .collection('work')
        .doc(id)
        .update(data)
    }),
  },
  getters: {
    getWorks: (state) => state.works,
  },
}
