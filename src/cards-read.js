import faunadb from 'faunadb'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})
function getId(urlPath) {
  return urlPath.match(/([^\/]*)\/*$/)[0]
}
exports.handler = (event, context, callback) => {
  const id = getId(event.path)
  console.log(`Function 'cards-read' invoked.`)
  return client.query(q.Get(q.Ref(`classes/card/${id}`)))
  .then((response) => {
    console.log("success", response)
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}