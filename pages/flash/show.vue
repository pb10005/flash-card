<template>
  <v-container pa-5>
    <v-flex>
      <v-card flat>
        <v-layout
          column
          justify-center
          align-center
        >
          <v-card-title class="display-1">
            {{ title }}
          </v-card-title>
          <v-card-subtitle class="headline">
            {{ deck.summary }}
          </v-card-subtitle>
          <v-progress-circular
            :rotate="-90"
            :size="100"
            :width="15"
            :value="deck.cards.length === 0? 0: 100 * deck.cards.filter(x => x.done).length / deck.cards.length"
            :color="deck.cards.filter(x => !x.done).length === 0? 'green': 'pink'"
          >
            {{ deck.cards.filter(x => x.done).length }} / {{ deck.cards.length }}
          </v-progress-circular>
        </v-layout>
      </v-card>
    </v-flex>
    <v-layout
      align-center
      justify-center
    >
      <v-btn color="primary" @click="toggleReversed">
        通常/逆引き
      </v-btn>
      <v-btn @click="normal">
        すべて
      </v-btn>
      <v-btn @click="notYet">
        未正解
      </v-btn>
      <v-btn @click="done">
        復習
      </v-btn>
    </v-layout>
    <FlashCard
      v-for="(item, index) in cards"
      :key="index"
      :card="item"
      :removable="false"
      :reversed="$nuxt.$route.query.reversed"
      @checked="$store.commit('cardList/toggle', item)"
      @remove="$store.commit('cardList/remove', item)"
    />
    <v-btn class="button" color="warning" @click="end">
      終了
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
      reminder: '',
      reversed: 0,
      type: 'normal'
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
    this.type = this.$route.query.type || 'normal'
    this.reversed = this.$route.query.reversed || 0
    this.$store.dispatch('cardList/setCards', this.$nuxt.$route.query.id)
    window.netlifyIdentity.on('login', () => {
      this.$store.dispatch('cardList/setCards', this.$nuxt.$route.query.id)
    })
  },
  methods: {
    end() {
      this.$store.dispatch('cardList/update', {
        id: this.$nuxt.$route.query.id,
        data: this.$store.state.cardList.deck
      })
      this.$router.push('/flash')
    },
    toggleReversed() {
      this.reversed ^= 1
      this.$router.push({
        query: {
          id: this.$nuxt.$route.query.id,
          type: this.type,
          reversed: this.reversed
        }
      })
    },
    normal() {
      this.type = 'normal'
      this.$router.push({
        query: {
          id: this.$nuxt.$route.query.id,
          type: this.type,
          reversed: this.reversed
        }
      })
    },
    notYet() {
      this.type = 'notyet'
      this.$router.push({
        query: {
          id: this.$nuxt.$route.query.id,
          type: this.type,
          reversed: this.reversed
        }
      })
    },
    done() {
      this.type = 'done'
      this.$router.push({
        query: {
          id: this.$nuxt.$route.query.id,
          type: this.type,
          reversed: this.reversed
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
