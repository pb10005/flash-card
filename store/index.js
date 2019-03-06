import axios from 'axios'
import getToken from './util/getToken'

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
    getToken().then(headers => {
      axios
        .post('/.netlify/functions/cards-create', JSON.stringify(payload), {
          headers: headers
        })
        .then(response => {
          const data = response.data
          context.commit('setData', data)
        })
        .catch(() => {
          window.netlifyIdentity.open()
        })
    })
  },
  fetchDecks(context, payload) {
    getToken().then(headers => {
      axios
        .get('/.netlify/functions/cards-read-all', { headers: headers })
        .then(response => {
          const list = response.data
          context.commit(
            'importData',
            list.map(x => {
              const res = x.data
              res.ref = x.ref['@ref'].id
              return res
            })
          )
        })
        .catch(() => {
          window.netlifyIdentity.logout()
          window.netlifyIdentity.open()
        })
    })
  }
}
