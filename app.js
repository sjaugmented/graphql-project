const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema')

const app = express()

app.use(
	'/graphql',
	graphqlHTTP({
		graphiql: true,
		schema,
	})
)

const PORT = 3000

app.listen(PORT, () => {
	console.log('listening on port', PORT)
})
