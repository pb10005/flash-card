import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

exports.handler = (event, context, callback) => {
  console.log(context.clientContext)
  if (!context.clientContext.user) {
    console.log("error")
    return callback(null, {
      statusCode: 400,
      body: "Unauthorized"
    })
  }
  const data = JSON.parse(event.body)
  console.log('Function `todo-create` invoked', data)
  // data.author = context.clientContext.user.user_metadata.full_name
  data.date = new Date().toString()
  data.cards = []
  const item = {
    data: data
  }
  return client.query(q.Create(q.Ref('classes/card'), item))
    .then((response) => {
      console.log('success', response)
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log('error', error)
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}