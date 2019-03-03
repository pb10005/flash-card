<template>
  <v-container fluid>
    <h2 class="headline">
      暗記
    </h2>
    <v-content>
      <p>
        単語とその説明を登録すると、ランダムな順番で単語を表示し、説明を覚えているか確認できます。
      </p>
    </v-content>
    <h2 class="headline">
      逆引き
    </h2>
    <v-content>
      <p>
        説明のみを表示して、単語を覚えているかチェックすることも可能です。
      </p>
    </v-content>
    <h2 class="headline">
      フィルター
    </h2>
    <v-content>
      <p>
        まだ覚えていない単語だけを表示したり、一度覚えた単語を復習したりできます。
      </p>
    </v-content>
    <p>
      Powered by <a>Vuetify</a>
    </p>
  </v-container>
</template>
<script>
export default {
  name: 'HomePage'
}
</script>
