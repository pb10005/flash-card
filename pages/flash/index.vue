<template>
  <v-container>
    <v-btn
      dark
      fixed
      fab
      bottom
      right
      color="pink"
      @click="$router.push('/flash/add')"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card
      v-for="(item, index) in list"
      :key="index"
      class="card"
      flat
    >
      <v-layout
        column
        justify-center
        align-center
      >
        <v-card-title>
          <p class="headline">
            {{ item.title }}
          </p>
        </v-card-title>
        <v-progress-circular
          :rotate="-90"
          :size="100"
          :width="15"
          :value="item.cards.length === 0? 0: 100 * item.cards.filter(x => x.done).length / item.cards.length"
          :color="item.cards.filter(x => !x.done).length === 0? 'green': 'pink'"
        >
          {{ item.cards.filter(x => x.done).length }} / {{ item.cards.length }}
        </v-progress-circular>
        <v-card-actions>
          <v-btn color="primary" @click="$router.push('/flash/show/?id=' + item.ref)">
            はじめる
          </v-btn>
          <v-btn @click="$router.push(`/flash/edit/?id=${ item.ref }`)">
            編集
          </v-btn>
        </v-card-actions>
      </v-layout>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: 'Flash',
  computed: {
    list() {
      return this.$store.state.list
    }
  },
  mounted() {
    this.$store.dispatch('fetchDecks')
    window.netlifyIdentity.on('login', () => {
      this.$store.dispatch('fetchDecks')
    })
  },
  methods: {}
}
</script>
<style scoped>
</style>
