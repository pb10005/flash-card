<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
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
      </v-list>
      <div data-netlify-identity-menu />
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>単語帳</v-toolbar-title>
    </v-toolbar>
    <v-card flat class="container">
      <v-layout
        justify-center
        align-center
      >
        <nuxt />
      </v-layout>
      <v-bottom-nav
        :value="true"
        fixed
        dark
        color="secondary"
      >
        <v-btn flat color="teal" @click="$router.push('/')">
          <span>ホーム</span>
          <v-icon>home</v-icon>
        </v-btn>

        <v-btn flat color="teal" @click="$router.push('/flash')">
          <span>単語帳</span>
          <v-icon>list</v-icon>
        </v-btn>

        <v-btn flat color="teal">
          <span>設定</span>
          <v-icon>settings</v-icon>
        </v-btn>
      </v-bottom-nav>
    </v-card>
    <!-- include the widget -->
    <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
  </v-app>
</template>
<script>
export default {
  data() {
    return {
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
  }
}
</script>
<style scoped>
.container {
  margin: 10px 0;
}
</style>
