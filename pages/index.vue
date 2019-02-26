<template>
  <section class="section">
    <h1 class="title">
      単語帳
    </h1>
    <h2 class="title is-4">
      暗記
    </h2>
    <hr>
    <article class="content">
      <p>
        単語とその説明を登録すると、ランダムな順番で単語を表示し、説明を覚えているか確認できます。
      </p>
    </article>
    <h2 class="title is-4">
      逆引き
    </h2>
    <hr>
    <article class="content">
      <p>
        説明のみを表示して、単語を覚えているかチェックすることも可能です。
      </p>
    </article>
    <h2 class="title is-4">
      フィルター
    </h2>
    <hr>
    <article class="content">
      <p>
        まだ覚えていない単語だけを表示したり、一度覚えた単語を復習したりできます。
      </p>
    </article>
    <p>
      Powered by <a href="https://github.com/buefy/buefy"> Buefy</a>
    </p>
  </section>
</template>
<script>
export default {
  name: 'HomePage'
}
</script>
