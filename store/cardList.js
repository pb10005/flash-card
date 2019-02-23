import axios from 'axios'
export const state = () => ({
  deck: {
    title: '',
    summary: '',
    cards: []
  },
  newDeck: {
    title: '',
    summary: '',
    cards: []
  }
})
export const mutations = {
  add(state, payload) {
    state.newDeck.cards.push({
      word: payload.word,
      description: payload.description,
      reminder: payload.reminder,
      done: false
    })
  },
  setSummary(state, payload) {
    state.newDeck.summary = payload
  },
  remove(state, todo) {
    state.newDeck.cards.splice(state.cards.indexOf(todo), 1)
  },
  toggle(state, card) {
    card.done = !card.done
  },
  setCards(state, payload) {
    state.deck = payload.data
    state.newDeck = Object.assign({}, state.deck)
  }
}
export const actions = {
  setCards(context, payload) {
    axios
      .get(`/.netlify/functions/cards-read/${payload}`)
      .then(response => {
        context.commit('setCards', response.data)
      })
      .catch(error => {
        alert('通信エラーです。', error)
      })
  },
  update(context, payload) {
    axios
      .post(`/.netlify/functions/cards-update/${payload.id}`, payload.data)
      .then(response => {})
      .catch(error => {
        alert('通信エラーです。', error)
      })
  }
}
export const getters = {
  filtered(state) {}
}
