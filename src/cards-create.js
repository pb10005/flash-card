import faunadb from 'faunadb' /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
})

/* export our lambda function as named "handler" export */
exports.handler = (event, context, callback) => {
  /* parse the string body into a useable JS object */
  // const data = JSON.parse(event.body)
  console.log('Function `todo-create` invoked')
  const todoItem = {
      id:643474,
      date:"2019-02-21T17:41:19.688Z",
      title:"英単語",
      summary:"Java単語",
      cards:[
          {
              word:"great",
              description:"すごい",
              reminder:"",
              done:true
              
          }
      ]
  }
  /* construct the fauna query */
  return client.query(q.Create(q.Ref('classes/card'), todoItem))
    .then((response) => {
      console.log('success', response)
      /* Success! return the response with statusCode 200 */
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response)
      })
    }).catch((error) => {
      console.log('error', error)
      /* Error! return the error with statusCode 400 */
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error)
      })
    })
}