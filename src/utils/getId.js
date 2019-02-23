export default (urlPath) => {
    return urlPath.match(/([^\/]*)\/*$/)[0]
  }