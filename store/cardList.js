export const state = () => ({
  cards: []
})
export const mutations = {
  add(state, payload) {
    state.cards.push({
      word: payload.word,
      description: payload.description,
      reminder: payload.reminder,
      done: false
    })
  },
  remove(state, todo) {
    state.cards.splice(state.cards.indexOf(todo), 1)
  },
  toggle(state, card) {
    card.done = !card.done
  }
}
export const getters = {
  filtered(state) {}
}
