<template>
  <section>
    <h1 class="title">
      あなたの単語帳
    </h1>
    <v-btn @click="$router.push('/flash/add')">
      新規作成
    </v-btn>
    <div
      v-for="(item, index) in list"
      :key="index"
    >
      <p>
        {{ item.title }}
      </p>
      <p>
        <span>
          <v-progress-circular
            :rotate="0"
            :size="100"
            :width="15"
            :value="100 * item.cards.filter(x => x.done).length / item.cards.length"
            color="pink"
          >
            {{ 100 * item.cards.filter(x => x.done).length / item.cards.length }}%
          </v-progress-circular>
          <progress class="progress is-success" :value="item.cards.filter(x => x.done).length" :max="item.cards.length" />
        </span>
      </p>
      <v-btn @click="$router.push('/flash/show/?id=' + item.ref)">
        はじめる
      </v-btn>
      <v-btn @click="$router.push(`/flash/edit/?id=${ item.ref }`)">
        編集
      </v-btn>
    </div>
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
