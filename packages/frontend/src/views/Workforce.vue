<template>
  <v-container>
    <v-row>
      <the-breadcrumbs />
    </v-row>
    <v-row>
      <the-workforce-carousel />
    </v-row>
    <v-row>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-row>
  </v-container>
</template>

<script>
import TheBreadcrumbs from '@/components/TheBreadcrumbs'
import TheWorkforceCarousel from '@/components/TheWorkforceCarousel'

export default {
  components: {
    TheBreadcrumbs,
    TheWorkforceCarousel,
  },
  created() {
    this.$store.dispatch('setWorkforce', [
      {
        id: '1',
        name: 'Valdemar Tellesson',
        description: 'Blister (nonthermal), right ankle',
      },
      {
        id: '2',
        name: 'Alan Writtle',
        description: 'Traumatic cerebral edema w LOC of unsp duration, subs',
      },
      {
        id: '3',
        name: 'Jervis Gehring',
        description: 'Laceration with foreign body of thigh',
      },
      {
        id: '4',
        name: 'Gusti Valentim',
        description:
          'Anterior subluxation of left humerus, subsequent encounter',
      },
      {
        id: '5',
        name: 'Emlyn Daglish',
        description: 'Disp fx of lunate, right wrist, init for clos fx',
      },
      {
        id: '6',
        name: 'Rosalinde Long',
        description:
          'Unsp fracture of unsp forearm, init for opn fx type 3A/B/C',
      },
      {
        id: '7',
        name: 'Pat Fairtlough',
        description:
          'Nondisp transverse fracture of shaft of right femur, init',
      },
      {
        id: '8',
        name: 'Mada Thorsen',
        description: 'Enterostomy hemorrhage',
      },
      {
        id: '9',
        name: 'Adham Endon',
        description:
          'Nondisp simple suprcndl fx w/o intrcndl fx unsp humer, sqla',
      },
      {
        id: '10',
        name: 'Arri Ferencowicz',
        description: 'Dislocation of MTP joint of right lesser toe(s), init',
      },
    ])
  },
}
</script>
