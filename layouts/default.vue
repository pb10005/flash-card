<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-toolbar
        color="indigo"
        dark  
      >
        <v-toolbar-title>{{ fullname || 'ゲスト' }}</v-toolbar-title>
      </v-toolbar>
      <v-list dense>
        <v-list-tile @click="$router.push('/')">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>ホーム</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/flash')">
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>単語帳</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="$router.push('/settings')">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>設定</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>単語帳</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-snackbar
        v-model="snackbar"
        bottom
        center
        :timeout="5000"
      >
        {{ message }}
        <v-btn
          color="pink"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
      <v-card flat>
        <v-layout
          justify-center
          align-center
        >
          <nuxt />
        </v-layout>
      </v-card>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      message: '',
      snackbar: false,
      drawer: null,
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: '単語帳',
          icon: 'cards',
          to: { name: 'flash' }
        }
      ]
    }
  },
  computed: {
    fullname() {
      return this.$store.getters['user/fullname']
    }
  },
  mounted() {
    this.$store.commit('user/setFullname')
    window.netlifyIdentity.on('login', () => {
      this.$store.commit('user/setFullname')
      this.showSnackbar('ログインしました')
    })
    window.netlifyIdentity.on('logout', () => {
      this.$store.commit('user/setFullname')
      this.showSnackbar('ログアウトしました')
    })
  },
  methods: {
    showSnackbar(text) {
      this.message = text
      this.snackbar = true
    }
  }
}
</script>
<style scoped>
.container {
  margin: 10px 0;
}
</style>
