<template>
  <v-slide-group :value="activeWorker" mandatory center-active show-arrows>
    <v-slide-item v-for="worker in workforce" :key="worker.id">
      <v-fade-transition mode="out-in">
        <v-worker-card
          class="ma-4"
          :worker="worker"
          :loading="loading"
          :active="activeWorkerId === worker.id"
        >
          <template v-slot:loading>
            <v-skeleton-loader type="list-item-avatar-three-line" />
          </template>
        </v-worker-card>
      </v-fade-transition>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import VWorkerCard from '@/components/VWorkerCard'
import loadingMixin from '@/mixins/loading.js'

export default {
  components: { VWorkerCard },
  mixins: [loadingMixin],
  data: () => ({
    workforce: [
      {
        id: 1,
        name: 'Valdemar Tellesson',
        description: 'Blister (nonthermal), right ankle',
      },
      {
        id: 2,
        name: 'Alan Writtle',
        description: 'Traumatic cerebral edema w LOC of unsp duration, subs',
      },
      {
        id: 3,
        name: 'Jervis Gehring',
        description: 'Laceration with foreign body of thigh',
      },
      {
        id: 4,
        name: 'Gusti Valentim',
        description:
          'Anterior subluxation of left humerus, subsequent encounter',
      },
      {
        id: 5,
        name: 'Emlyn Daglish',
        description: 'Disp fx of lunate, right wrist, init for clos fx',
      },
      {
        id: 6,
        name: 'Rosalinde Long',
        description:
          'Unsp fracture of unsp forearm, init for opn fx type 3A/B/C',
      },
      {
        id: 7,
        name: 'Pat Fairtlough',
        description:
          'Nondisp transverse fracture of shaft of right femur, init',
      },
      {
        id: 8,
        name: 'Mada Thorsen',
        description: 'Enterostomy hemorrhage',
      },
      {
        id: 9,
        name: 'Adham Endon',
        description:
          'Nondisp simple suprcndl fx w/o intrcndl fx unsp humer, sqla',
      },
      {
        id: 10,
        name: 'Arri Ferencowicz',
        description: 'Dislocation of MTP joint of right lesser toe(s), init',
      },
    ],
  }),
  computed: {
    activeWorkerId() {
      return this.$route.params?.id
    },
    activeWorker() {
      return this.workforce.findIndex(
        (worker) => worker.id === this.activeWorkerId
      )
    },
  },
}
</script>
