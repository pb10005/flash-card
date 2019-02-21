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
    <!-- Add a menu:
    Log in / Sign up - when the user is not logged in
    Username / Log out - when the user is logged in
    -->
    <div data-netlify-identity-menu />
    <!-- include the widget -->
    <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
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
