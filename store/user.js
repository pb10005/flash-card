const identity = window.netlifyIdentity

export const state = () => ({
  fullname: ''
})
export const mutations = {
  setFullname(state) {
    if (!identity.currentUser()) {
      state.fullname = ''
    } else {
      state.fullname = identity.currentUser().user_metadata.full_name
    }
  }
}
export const actions = {
  open(context, payload) {
    identity.open()
  }
}
export const getters = {
  identity(state) {
    return identity
  },
  fullname(state) {
    return state.fullname
  }
}
