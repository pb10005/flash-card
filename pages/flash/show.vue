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
      if (this.$nuxt.$route.query.type === 'done') {
        return this.deck.cards.filter(x => x.done)
      } else if (this.$nuxt.$route.query.type === 'notyet') {
        return this.deck.cards.filter(x => !x.done)
      } else {
        return this.deck.cards
      }
    }
  },
  mounted() {
    const list = this.$store.state.list.find(
      x => x.id === this.$nuxt.$route.query.id
    )
    this.$store.dispatch('cardList/setCards', list)
  }
}
</script>
<style scoped>
</style>
