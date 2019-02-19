<template>
    <section>
      <h1 class="title">あなたの単語帳</h1>
      <b-field>
        <b-input type="text" placeholder="title" v-model="newTitle"></b-input>
        <button class="button" @click="$store.commit('add', newTitle)">作成</button>
      </b-field>
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="$store.commit('toggle', item)">
          <nuxt-link to="/flash/card">{{item.title}}</nuxt-link>
        </li>
      </ul>
    </section>
</template>
<script>
export default {
  data() {
    return {
      newTitle: ''
    }
  },
  computed: {
    list() {
      return this.$store.state.list
    }
  }
}
</script>
<style scoped>
</style>
