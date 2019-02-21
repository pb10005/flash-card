import axios from 'axios'

export const state = () => ({
  list: []
})
export const mutations = {
  importData(state, payload) {
    state.list = payload
  },
  add(state, title) {
    if (!title) return
    state.list.push({
      id: Math.floor(Math.random() * 1000000),
      date: new Date(),
      title: title,
      summary: '',
      cards: []
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  }
}

export const actions = {
  fetchDecks(context, payload) {
    axios.get('/.netlify/functions/cards-read-all')
      .then(response => {
        alert(JSON.stringify(response))
        context.commit('importData', response.map(x => x.data))
      })
  }
}