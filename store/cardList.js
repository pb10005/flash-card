import axios from 'axios'
import getToken from './util/getToken'
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
    state.newDeck.cards.splice(state.newDeck.cards.indexOf(todo), 1)
  },
  toggle(state, card) {
    card.done = !card.done
  },
  moveUp(state, card) {
    const tmpList = Object.assign([], state.newDeck.cards)
    const index = tmpList.indexOf(card)
    if (index === 0) return
    const tmp = tmpList[index]
    tmpList[index] = tmpList[index - 1]
    tmpList[index - 1] = tmp
    state.newDeck.cards = tmpList
  },
  moveDown(state, card) {
    const tmpList = Object.assign([], state.newDeck.cards)
    const index = tmpList.indexOf(card)
    if (index === tmpList.length - 1) return
    const tmp = tmpList[index]
    tmpList[index] = tmpList[index + 1]
    tmpList[index + 1] = tmp
    state.newDeck.cards = tmpList
  },
  setCards(state, payload) {
    state.deck = payload.data
    state.newDeck = Object.assign({}, state.deck)
  },
  update(state, payload) {
    if (payload.word) {
      payload.card.word = payload.word
    } else if (payload.description) {
      payload.card.description = payload.description
    } else if (payload.reminder) {
      payload.card.reminder = payload.reminder
    }
  }
}
export const actions = {
  setCards(context, payload) {
    getToken().then(headers => {
      axios
        .get(`/.netlify/functions/cards-read/${payload}`, {
          headers: headers
        })
        .then(response => {
          context.commit('setCards', response.data)
        })
        .catch(() => {
          window.netlifyIdentity.open()
        })
    })
  },
  async update(context, payload) {
    await getToken().then(headers => {
      axios
        .post(`/.netlify/functions/cards-update/${payload.id}`, payload.data, {
          headers: headers
        })
        .then(response => {})
        .catch(() => {
          window.netlifyIdentity.open()
        })
    })
  }
}
export const getters = {
  shuffled(state) {
    const list = Object.assign([], state.deck.cards)
    for (let i = list.length - 1; i >= 1; i--) {
      const r = Math.floor(Math.random() * i)
      const tmp = list[r]
      list[r] = list[i]
      list[i] = tmp
    }
    return list
  }
}
