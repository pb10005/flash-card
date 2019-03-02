<template>
  <section>
    <h1 class="title">
      あなたの単語帳
    </h1>
    <v-btn @click="$router.push('/flash/add')">
      新規作成
    </v-btn>
    <v-list two-line>
      <template v-for="(item, index) in list">
        <v-subheader
          v-if="item.header"
          :key="item.header"
        >
          {{ item.header }}
        </v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-tile
          v-else
          :key="item.title"
          avatar
          @click="$router.push('/flash/show/?id=' + item.ref)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <p class="is-size-6">
              <span>
                進捗度: {{ item.cards.filter(x => x.done).length }} / {{ item.cards.length }}
              </span>
              <span>
                <progress class="progress is-success" :value="item.cards.filter(x => x.done).length" :max="item.cards.length" />
              </span>
            </p>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </section>
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
