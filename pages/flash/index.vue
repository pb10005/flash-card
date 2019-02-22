<template>
  <section class="section">
    <h1 class="title">
      あなたの単語帳
    </h1>
    <nuxt-link to="/flash/add">
      新規作成
    </nuxt-link>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <p class="is-size-4">
          {{ item.title }}
        </p>
        <p class="is-size-6">
          進捗度: {{ item.cards.filter(x => x.done).length }} / {{ item.cards.length }}
        </p>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'normal'}}">
          通常
        </nuxt-link>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'reverse'}}">
          逆引き
        </nuxt-link>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'notyet'}}">
          未正解
        </nuxt-link>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'done'}}">
          復習
        </nuxt-link>
        <div>
          <span>{{ new Date(item.date).toString() }}</span>
          <nuxt-link :to="{path: '/flash/edit', query: {id: item.ref}}">
            編集
          </nuxt-link>
        </div>
        <hr>
      </li>
    </ul>
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
  },
  methods: {}
}
</script>
<style scoped>
</style>
