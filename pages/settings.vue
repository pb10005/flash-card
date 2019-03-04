<template>
  <v-container pa-5>
    <v-layout
      justify-center
      align-center
    >
      <v-btn @click="login">
        {{ fullname ? 'ログアウト': 'ログイン' }}
      </v-btn>
    </v-layout>
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
