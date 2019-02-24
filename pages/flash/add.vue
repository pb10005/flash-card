<template>
  <div>
    <form @submit.prevent="$store.dispatch('createDeck', {title: title, summary: summary})">
      <b-field label="タイトル">
        <b-input v-model="title" type="text" placeholder="タイトル" required />
      </b-field>
      <b-field label="概要">
        <b-input v-model="summary" type="text" placeholder="概要" required />
      </b-field>
      <button type="submit" class="button">
        新規作成
      </button>
    </form>
  </div>
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
