const graphql = require('graphql')

const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLFloat,
} = graphql

// Scalar Types - primitives
// string = GraphQLString
// int
// float
// boolean
// ID

const Person = new GraphQLObjectType({
	name: 'Person',
	description: 'Represents a Person Type',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		isMarried: { type: GraphQLBoolean },
		gpa: { type: GraphQLFloat },

		justAType: {
			type: Person,
			resolve(parent, args) {
				return parent
			},
		},
	}),
})

// RootQuery
const RootQuery = new graphql.GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Description',
	fields: {
		person: {
			type: Person,
			resolve(parent, args) {
				let personObj = {
					name: 'Antonio',
					age: 35,
					isMarried: true,
					gpa: 4.0,
				}
				return personObj
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
