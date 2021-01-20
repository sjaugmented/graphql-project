const graphql = require("graphql")

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQlSchema,
} = graphql

// Create types
const UserType = new GraphQLObjectType({
  name: "User",
  description: "Documentation for user",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  description: "Description",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // resolve with data
        // get and return data from data source
      },
    },
  },
})

module.exports = new GraphQlSchema({
  query: RootQuery,
})