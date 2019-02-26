<template>
  <section class="section">
    <p class="title">
      {{ title }}
    </p>
    <p class="subtitle">
      {{ deck.summary }}
    </p>
    <p>進捗度 {{ cards.filter(x => x.done).length }}/{{ cards.length }}</p>
    <FlashCard
      v-for="(item, index) in cards"
      :key="index"
      :card="item"
      :removable="false"
      :reversed="$nuxt.$route.query.type === 'reverse'"
      @checked="$store.commit('cardList/toggle', item)"
      @remove="$store.commit('cardList/remove', item)"
    />
    <button class="button" @click="end">終了</button>
  </section>
</template>
<script>
import FlashCard from '~/components/FlashCard'
export default {
  name: 'Card',
  components: {
    FlashCard
  },
  data() {
    return {
      word: '',
      description: '',
      reminder: ''
    }
  },
  computed: {
    deck() {
      return this.$store.state.cardList.deck
    },
    title() {
      return this.deck.title
    },
    cards() {
      const list = this.$store.getters['cardList/shuffled']
      if (this.$nuxt.$route.query.type === 'done') {
        return list.filter(x => x.done)
      } else if (this.$nuxt.$route.query.type === 'notyet') {
        return list.filter(x => !x.done)
      } else {
        return list
      }
    }
  },
  mounted() {
    this.$store.dispatch('cardList/setCards', this.$nuxt.$route.query.id)
  },
  methods: {
    end() {
      this.$store.dispatch('cardList/update', {
        id: this.$nuxt.$route.query.id,
        data: this.$store.state.cardList.deck
      })
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
</style>
