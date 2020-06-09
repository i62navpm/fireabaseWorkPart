<template>
  <div>
    <v-work-place-dialog-form ref="workPlaceForm" @onSubmit="saveWorkPlace" />
    <v-autocomplete
      class="pt-0"
      :value="value"
      :items="works"
      :search-input.sync="search"
      flat
      label="Obras"
      multiple
      chips
      deletable-chips
      item-text="name"
      item-value="id"
      no-data-text="No existe la obra"
      full-width
      @input="changeInput"
    >
      <template v-slot:item="data">
        <v-list-item-content class="v-workplace-select-item">
          <v-list-item-title>{{ data.item.name }}</v-list-item-title>
          <v-list-item-subtitle class="text-truncate">
            {{ data.item.address }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-icon>
          <v-icon
            color="info"
            class="mr-5"
            @click.native.stop="openWorkPlaceDialog(data.item)"
          >
            mdi-pencil
          </v-icon>
        </v-list-item-icon>
      </template>
      <template v-slot:no-data>
        <v-list-item @click="openWorkPlaceDialog()">
          <v-list-item-icon>
            <v-icon color="success">mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Añadir obra</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import VWorkPlaceDialogForm from '@/components/VWorkPlaceDialogForm'
import notificationMixin from '@/mixins/notification'
import dayjs from 'dayjs'

export default {
  components: {
    VWorkPlaceDialogForm,
  },
  mixins: [notificationMixin],
  props: {
    value: {
      required: true,
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loading: false,
      items: [],
      search: null,
    }
  },
  computed: {
    works() {
      return this.$store.getters.getWorks
    },
  },
  watch: {
    search(val) {
      val && this.querySelections(val)
    },
  },
  methods: {
    querySelections(v) {
      this.items = this.works.filter((e) => e.name.includes(v))
    },
    openWorkPlaceDialog(work) {
      this.$refs.workPlaceForm.openDialog(work)
    },
    async changeInput(works) {
      try {
        const refs = await Promise.all(
          works.map((work) =>
            work.id ? work : this.$store.dispatch('getWorkRef', work)
          )
        )
        this.$emit('input', refs)
      } catch (err) {
        this.notifyError('Error al obtener las referencias')
      }
    },
    async saveWorkPlace(cb) {
      try {
        const { id, ...work } = JSON.parse(
          JSON.stringify(this.$refs.workPlaceForm.work)
        )
        const createdAt = dayjs().toISOString()
        const data = {
          createdAt,
          ...work,
        }
        if (!id) {
          const { id: newId } = await this.$store.dispatch('createWork', data)
          this.changeInput([...this.value, newId])
        } else {
          await this.$store.dispatch('updateWork', { id, data })
        }

        this.$refs.workPlaceForm.closeDialog()
        this.notifySuccess('Obra guardada')
      } catch (err) {
        this.notifyError('Error al guardar')
      } finally {
        cb()
      }
    },
  },
}
</script>

<style lang="scss">
.v-workplace-select-item {
  max-width: 428px !important;
}
</style>
