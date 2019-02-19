<template>
  <section>
    <p class="title">単語帳のタイトル</p>
    <p>進捗度</p>
    <div class="card">
      <content class="card-content">
        <b-input v-model="word" placeholder="単語"></b-input>
        <b-input v-model="description" placeholder="説明"></b-input>
        <b-input v-model="reminder" placeholder="思い出し方"></b-input>
        <button class="button" @click="$store.commit('cardList/add', {word: word, description: description, reminder: reminder})">追加</button>
      </content>
    </div>
    <button class="button" @click="filter">未達成のみ</button>
    <FlashCard
      v-for="(item, index) in cards"
      :key="index"
      :card="item"
      @checked="$store.commit('cardList/toggle', item)"
      @remove="$store.commit('cardList/remove', item)" />
  </section>
</template>
<script>
import FlashCard from '~/components/FlashCard'
export default {
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
    cards() {
      return this.$store.state.cardList.cards
    }
  },
  methods: {
    filter() {}
  }
}
</script>
<style scoped>
</style>
