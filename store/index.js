import axios from 'axios'

export const state = () => ({
  list: [],
  data: {}
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
  },
  setData(state, payload) {
    state.data = payload
  }
}

export const actions = {
  createDeck(context, payload) {
    axios
      .post('/.netlify/functions/cards-create', JSON.stringify(payload))
      .then(response => {
        const data = response.data
        context.commit('setData', data)
      })
  },
  fetchDecks(context, payload) {
    axios.get('/.netlify/functions/cards-read-all').then(response => {
      const list = response.data
      context.commit('importData', list.map(x => {
        let res = x.data
        res.ref = x.id
        return res
      }))
    })
  }
}
