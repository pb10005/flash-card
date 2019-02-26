import faunadb from 'faunadb'

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
  console.log("Function `cards-read-all` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all-cards"))))
  .then((response) => {
    const todoRefs = response.data
    console.log("Card refs", todoRefs)
    console.log(`${todoRefs.length} cards found`)
    // create new query out of todo refs. http://bit.ly/2LG3MLg
    const getAllTodoDataQuery = todoRefs.map((ref) => {
      return q.Get(ref)
    })
    // then query the refs
    return client.query(getAllTodoDataQuery).then((ret) => {
      const data = ret.filter(x => {
        return x.data.author === context.clientContext.user.sub
      })
      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(data)
      })
    })
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}
