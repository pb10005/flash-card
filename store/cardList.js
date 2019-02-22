import axios from 'axios'
export const state = () => ({
  deck: {
    id: -1,
    title: '',
    summary: '',
    cards: []
  }
})
export const mutations = {
  add(state, payload) {
    state.deck.cards.push({
      word: payload.word,
      description: payload.description,
      reminder: payload.reminder,
      done: false
    })
  },
  setSummary(state, payload) {
    state.deck.summary = payload
  },
  remove(state, todo) {
    state.deck.cards.splice(state.cards.indexOf(todo), 1)
  },
  toggle(state, card) {
    card.done = !card.done
  },
  setCards(state, payload) {
    state.deck = payload.data
    state.deck.summary = payload.data.summary
  }
}
export const actions = {
  setCards(context, payload) {
    axios.get(`/.netlify/functions/cards-read/${payload}`).then(response => {
      context.commit('setCards', response.data)
    })
  }
}
export const getters = {
  filtered(state) {}
}
