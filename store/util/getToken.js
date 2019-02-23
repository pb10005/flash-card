export default () => {
  const headers = {
    'Content-Type': 'application/json'
  }
  window.netlifyIdentity
    .currentUser()
    .jwt()
    .then(token => {
      return {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    })
  return Promise.resolve(headers)
}