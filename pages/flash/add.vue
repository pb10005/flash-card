<template>
  <section>
    <form @submit.prevent="$store.dispatch('createDeck', {title: title, summary: summary})">
      <v-text-field v-model="title" type="text" label="タイトル" required />
      <v-text-field v-model="summary" type="text" label="概要" required />
      <v-btn type="submit" class="button">
        新規作成
      </v-btn>
    </form>
  </section>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      summary: ''
    }
  }
}
</script>
<style scoped>
</style>
