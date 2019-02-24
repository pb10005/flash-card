<template>
  <div>
    <div class="card">
      <div v-if="editable">
        <b-input :value="card.word" @input="inputWord" />
        <b-input :value="card.description" @input="value => $emit('inputDescription', value)" />
        <b-input :value="card.reminder" @input="value => $emit('inputReminder', value)" />
      </div>
      <div v-else>
        <p class="title">
          {{ reversed ? card.description : card.word }}
        </p>
        <button class="button" @click="descriptionRevealed ^= true">
          {{ reversed ? '単語' : '説明' }}
        </button>
        <button class="button" @click="reminderRevealed ^= true">
          思い出し方
        </button>
      </div>
      <button v-if="editable" class="button" @click="$store.commit('cardList/moveUp', card)">
        上
      </button>
      <button v-if="editable" class="button" @click="$store.commit('cardList/moveDown', card)">
        下
      </button>
      <button v-if="removable" class="button is-danger" @click="remove">
        削除
      </button>
      <button v-if="!editable" class="button" :class="{'is-success': card.done, 'is-danger': !card.done}" @click="check">
        {{ card.done ? '正解済':'未正解' }}
      </button>
      <p v-if="descriptionRevealed">
        {{ reversed ? card.word : card.description }}
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
    reversed: Boolean,
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
