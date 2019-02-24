<template>
  <section class="section">
    <p class="title">
      {{ title }}
    </p>
    <b-field label="概要">
      <b-input v-model="summary" type="textarea" :rows="3" :maxlength="200" />
    </b-field>
    <p>進捗度 {{ cards.filter(x => x.done).length }}/{{ cards.length }}</p>
    <form
      @submit.prevent="$store.commit('cardList/add', {word: word, description: description, reminder: reminder})"
    >
      <content class="card-content">
        <b-field label="単語">
          <b-input
            v-model="word"
            placeholder="単語"
            required
          />
        </b-field>
        <b-field label="説明">
          <b-input
            v-model="description"
            placeholder="説明"
            required
          />
        </b-field>
        <b-field label="思い出し方">
          <b-input
            v-model="reminder"
            placeholder="思い出し方"
          />
        </b-field>
        <button
          class="button"
        >
          追加
        </button>
      </content>
    </form>
    <FlashCard
      v-for="(item, index) in cards"
      :key="index"
      :card="item"
      :removable="true"
      :editable="true"
      @checked="$store.commit('cardList/toggle', item)"
      @remove="$store.commit('cardList/remove', item)"
      @inputWord="value => $store.commit('cardList/update', {
        card: item,
        word: value
      })"
      @inputDescription="value => $store.commit('cardList/update', {
        card: item,
        description: value
      })"
      @inputReminder="value => $store.commit('cardList/update', {
        card: item,
        reminder: value
      })"
    />
    <button class="button is-danger" @click="$router.go(-1)">
      キャンセル
    </button>
    <button class="button" @click="submit">
      保存
    </button>
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
      return this.$store.state.cardList.newDeck
    },
    title() {
      return this.deck.title
    },
    summary: {
      get() {
        return this.deck.summary
      },
      set(value) {
        this.$store.commit('cardList/setSummary', value)
      }
    },
    name() {
      return this.deck.title
    },
    cards: {
      get() {
        return this.deck.cards
      },
      set(value) {
        this.$store.commit('cardList/setCardList', value)
      }
    }
  },
  mounted() {
    this.$store.dispatch('cardList/setCards', this.$nuxt.$route.query.id)
  },
  methods: {
    submit() {
      this.$store.dispatch('cardList/update', {
        id: this.$nuxt.$route.query.id,
        data: this.$store.state.cardList.newDeck
      })
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
</style>
