const graphql = require('graphql')
const _ = require('lodash')

// dummy data
const usersData = [
	{ id: '1', name: 'Bond', age: 36, profession: 'director' },
	{ id: '13', name: 'Anna', age: 26, profession: 'programmer' },
	{ id: '211', name: 'Bella', age: 16, profession: 'dancer' },
	{ id: '19', name: 'Gina', age: 26, profession: 'whore' },
	{ id: '150', name: 'Georgina', age: 36, profession: 'puppetteer' },
]

const hobbiesData = [
	{ id: '1', title: 'Photography', description: 'duh' },
	{ id: '2', title: 'Programming', description: 'duh' },
	{ id: '3', title: 'Writing', description: 'duh' },
	{ id: '4', title: 'Fisting', description: 'duh' },
	{ id: '5', title: 'Gaming', description: 'duh' },
]

const postsData = [
	{ id: '1', comment: 'This is the first comment.' },
	{ id: '2', comment: 'This is the second comment.' },
	{ id: '3', comment: 'This is the third comment.' },
	{ id: '4', comment: 'This is the fourth comment.' },
	{ id: '5', comment: 'This is the last comment.' },
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
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		profession: { type: GraphQLString },
	}),
})

const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	description: 'Documentation for hobby',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
	}),
})

const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'Documentation for post',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
	}),
})

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	description: 'Documentation for movie',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		year: { type: GraphQLInt },
	}),
})

// RootQuery
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'Description',
	fields: {
		user: {
			type: UserType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// resolve with data
				// get and return data from data source
				return _.find(usersData, { id: args.id })
			},
		},

		hobby: {
			type: HobbyType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(hobbiesData, { id: args.id })
			},
		},

		post: {
			type: PostType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(postsData, { id: args.id })
			},
		},

		movie: {
			type: MovieType,
			args: { id: { type: GraphQLID }, title: { type: GraphQLString } },
			resolve(parent, args) {
				return _.find(moviesData, { id: args.id })
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
