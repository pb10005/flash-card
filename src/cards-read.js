import faunadb from 'faunadb'
import getId from './utils/getId'

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  if (!context.clientContext.user) {
    return callback(null, {
      statusCode: 400,
      body: "Unauthorized"
    })
  }
  const id = getId(event.path)
  console.log(`Function 'cards-read' invoked.`)
  return client.query(q.Get(q.Ref(`classes/card/${id}`)))
  .then((response) => {
    console.log("success", response)
    if (response.data.author !== context.clientContext.user.user_metadata.full_name) {
      return callback(null, {
        statusCode: 400,
        body: "Unauthenticated"
      })
    } else {
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}