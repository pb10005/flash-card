<template>
  <v-container>
    <v-layout
      justify-center
      align-center
    >
      <v-btn @click="login">
        ログイン
      </v-btn>
    </v-layout>
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
