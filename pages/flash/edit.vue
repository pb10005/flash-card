<template>
  <v-container>
    <p class="display-1">
      {{ title }}
    </p>
    <v-text-field v-model="summary" type="textarea" label="説明" :rows="3" :maxlength="200" />
    <form
      @submit.prevent="$store.commit('cardList/add', {word: word, description: description, reminder: reminder})"
    >
      <content class="card-content">
        <v-text-field
          v-model="word"
          label="単語"
          required
        />
        <v-text-field
          v-model="description"
          label="説明"
          required
        />
        <v-text-field
          v-model="reminder"
          label="思い出し方"
        />
        <v-btn
          color="primary"
          type="submit"
          class="button"
        >
          追加
        </v-btn>
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
    <v-btn color="pink" dark class="button is-danger" @click="$router.go(-1)">
      キャンセル
    </v-btn>
    <v-btn color="success" class="button" @click="submit">
      保存
    </v-btn>
  </v-container>
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
