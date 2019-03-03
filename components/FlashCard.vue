<template>
  <div>
    <div class="card">
      <div v-if="editable">
        <v-text-field :value="card.word" label="単語" @input="inputWord" />
        <v-text-field :value="card.description" label="説明" @input="value => $emit('inputDescription', value)" />
        <v-text-field :value="card.reminder" label="思い出し方" @input="value => $emit('inputReminder', value)" />
        <v-btn class="button" @click="$store.commit('cardList/moveUp', card)">
          上
        </v-btn>
        <v-btn class="button" @click="$store.commit('cardList/moveDown', card)">
          下
        </v-btn>
        <v-btn class="button is-danger" @click="remove">
          削除
        </v-btn>
      </div>
      <div v-else>
        <p class="title">
          {{ reversed === 1 ? card.description : card.word }}
        </p>
        <v-btn class="button" @click="descriptionRevealed ^= true">
          {{ reversed === 1 ? '単語' : '説明' }}
        </v-btn>
        <v-btn class="button" @click="reminderRevealed ^= true">
          思い出し方
        </v-btn>
        <v-btn v-if="!editable" class="button" :color="card.done ? 'success' : 'warning'" :class="{'is-success': card.done, 'is-danger': !card.done}" @click="check">
          {{ card.done ? '正解済':'未正解' }}
        </v-btn>
      </div>
      <p v-if="descriptionRevealed">
        {{ reversed === 1 ? card.word : card.description }}
      </p>
      <p v-if="reminderRevealed">
        {{ card.reminder }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    reversed: {
      type: Number,
      default() {
        return 0
      }
    },
    removable: Boolean,
    editable: Boolean,
    card: {
      type: Object,
      default() {
        return {
          word: '',
          description: '',
          reminder: ''
        }
      }
    }
  },
  data() {
    return {
      newCard: this.card,
      descriptionRevealed: false,
      reminderRevealed: false
    }
  },
  methods: {
    check() {
      this.$emit('checked')
    },
    remove() {
      this.$emit('remove')
    },
    inputWord(value) {
      this.$emit('inputWord', value)
    }
  }
}
</script>
<style scoped>
.card {
  text-align: center;
  padding: 10px;
  margin: 0;
}
</style>
