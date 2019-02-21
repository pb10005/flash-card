<template>
  <section class="section">
    <div class="columns is-mobile">
      <card
        title="Free"
        icon="github-circle"
      >
        Powered by <a href="https://github.com/buefy/buefy"> Buefy</a>
      </card>
    </div>
  </section>
</template>

<script>
import Card from '~/components/Card'

export default {
  name: 'HomePage',

  components: {
    Card
  }
}
</script>
