export default () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  if (window.netlifyIdentity.currentUser()) {
    return window.netlifyIdentity
      .currentUser()
      .jwt()
      .then(token => {
        return {
          ...headers,
          Authorization: `Bearer ${token}`
        }
      })
  }
  return Promise.resolve(headers)
}
