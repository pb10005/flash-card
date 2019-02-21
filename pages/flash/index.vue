<template>
  <section class="section">
    <h1 class="title">
      あなたの単語帳
    </h1>
    <section class="section">
      <b-field label="データ">
        <b-input v-model="jsonData" :rows="3" type="textarea" />
      </b-field>
      <button class="button" @click="importData">
        インポート
      </button>
      <button class="button" @click="exportData">
        エクスポート
      </button>
      <button class="button" @click="saveLocal">
        オフライン保存
      </button>
      <button class="button" @click="loadLocal">
        オフライン読込
      </button>
    </section>
    <b-field>
      <b-input v-model="newTitle" type="text" placeholder="タイトル" />
      <button class="button" @click="$store.commit('add', newTitle)">
        新規作成
      </button>
    </b-field>
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
      >
        <p class="is-size-4">
          {{ item.title }}
        </p>
        <p class="is-size-6">
          進捗度: {{ item.cards.filter(x => x.done).length }} / {{ item.cards.length }}
        </p>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'normal'}}">
          通常
        </nuxt-link>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'reverse'}}">
          逆引き
        </nuxt-link>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'done'}}">
          復習
        </nuxt-link>
        <nuxt-link :to="{path: '/flash/show', query: {id: item.id, type: 'notyet'}}">
          未正解
        </nuxt-link>
        <div>
          <span>{{ new Date(item.date).toString() }}</span>
          <nuxt-link :to="{path: '/flash/edit', query: {id: item.id}}">
            編集
          </nuxt-link>
        </div>
        <hr>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: 'Flash',
  data() {
    return {
      newTitle: '',
      jsonData: ''
    }
  },
  computed: {
    list() {
      return this.$store.state.list
    }
  },
  methods: {
    importData() {
      if (!this.jsonData) return
      this.$store.commit('importData', JSON.parse(this.jsonData))
    },
    exportData() {
      this.jsonData = JSON.stringify(this.list)
    },
    saveLocal() {
      localStorage.data = JSON.stringify(this.list)
    },
    loadLocal() {
      if (!localStorage.data) return
      this.$store.commit('importData', JSON.parse(localStorage.data))
    }
  }
}
</script>
<style scoped>
</style>
