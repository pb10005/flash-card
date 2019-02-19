<template>
  <div>
    <div class="card">
        <p class="title">{{card.word}}</p>
        <button class="button" @click="descriptionRevealed ^= true">説明</button>
        <button class="button" @click="reminderRevealed ^= true">思い出し方</button>
        <button class="button" @click="reminderRevealed ^= true">編集</button>
        <button class="button is-danger" @click="remove">削除</button>
        <p v-if="descriptionRevealed">{{card.description}}</p>
        <p v-if="reminderRevealed">{{card.reminder}}</p>
        <button class="button" @click="check">{{card.done?'済':'覚えた'}}</button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      word: String,
      description: String,
      reminder: String
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
