const graphql = require('graphql')
const _ = require('lodash')

// dummy data
const usersData = [
	{ id: '1', name: 'Bond', age: 36, profession: 'director' },
	{ id: '13', name: 'Anna', age: 26, profession: 'programmer' },
	{ id: '211', name: 'Bella', age: 16, profession: 'dancer' },
	{ id: '19', name: 'Gina', age: 26, profession: 'whore' },
	{ id: '150', name: 'Goergina', age: 36, profession: 'puppetteer' },
]

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLSchema,
} = graphql

// Create types
const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Documentation for user',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString },
	}),
})

// RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Description',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// resolve with data
				// get and return data from data source
				return _.find(usersData, { id: args.id })
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
