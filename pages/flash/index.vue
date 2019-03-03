<template>
  <v-container fuild>
    <v-btn
      dark
      fixed
      fab
      top
      right
      color="pink"
      @click="$router.push('/flash/add')"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-card
      v-for="(item, index) in list"
      :key="index"
      flat
    >
      <v-card-title>
        <h3 class="headline">
          {{ item.title }}
        </h3>
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
        <v-btn @click="$router.push('/flash/show/?id=' + item.ref)">
          はじめる
        </v-btn>
        <v-btn @click="$router.push(`/flash/edit/?id=${ item.ref }`)">
          編集
        </v-btn>
      </v-card-actions>
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
