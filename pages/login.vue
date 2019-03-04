<template>
  <v-container>
    <v-btn @click="login">
      ログイン
    </v-btn>
  </v-container>
</template>
<script>
export default {
  methods: {
    login() {
      this.$store.dispatch('user/open')
    }
  }
}
</script>
