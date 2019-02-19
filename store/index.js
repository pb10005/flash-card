export const state = () => ({
  list: []
})
export const mutations = {
  add(state, title) {
    state.list.push({
      title: title
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}
