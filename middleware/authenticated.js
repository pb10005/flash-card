export default ({ route, store, redirect }) => {
  if (route.path === '/') return
  if (!window.netlifyIdentity) {
    return redirect('/')
  }
}
