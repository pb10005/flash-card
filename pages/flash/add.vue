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
    <p>{{response}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      summary: ''
    }
  },
  computed: {
    response() {
      return this.$store.state.data
    }
  }
}
</script>
<style scoped>
</style>
