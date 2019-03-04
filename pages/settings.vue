<template>
  <v-container>
    <v-btn @click="login">
      {{ fullname ? 'ログアウト': 'ログイン' }}
    </v-btn>
  </v-container>
</template>
<script>
export default {
  computed: {
    fullname() {
      return this.$store.getters['user/fullname']
    }
  },
  methods: {
    login() {
      this.$store.dispatch('user/open')
    }
  }
}
</script>
