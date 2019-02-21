<template>
  <div>
    <div class="card">
      <p class="title">
        {{ reversed ? card.description : card.word }}
      </p>
      <button class="button" @click="descriptionRevealed ^= true">
        {{ reversed ? '単語' : '説明' }}
      </button>
      <button class="button" @click="reminderRevealed ^= true">
        思い出し方
      </button>
      <button v-if="removable" class="button is-danger" @click="remove">
        削除
      </button>
      <button class="button" :class="{'is-success': card.done, 'is-danger': !card.done}" @click="check">
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
