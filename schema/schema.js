const graphql = require('graphql')
const _ = require('lodash')

//#region  dummy data
const usersData = [
	{ id: '1', name: 'Bond', age: 36, profession: 'director' },
	{ id: '2', name: 'Anna', age: 26, profession: 'programmer' },
	{ id: '3', name: 'Bella', age: 16, profession: 'dancer' },
	{ id: '4', name: 'Gina', age: 26, profession: 'whore' },
	{ id: '5', name: 'Georgina', age: 36, profession: 'puppetteer' },
]

const hobbiesData = [
	{ id: '1', title: 'Photography', description: 'duh', userId: '1' },
	{ id: '2', title: 'Programming', description: 'duh', userId: '3' },
	{ id: '3', title: 'Writing', description: 'duh', userId: '2' },
	{ id: '4', title: 'Fisting', description: 'duh', userId: '4' },
	{ id: '5', title: 'Gaming', description: 'duh', userId: '4' },
]

const postsData = [
	{ id: '1', comment: 'This is the first comment.', userId: '1' },
	{ id: '2', comment: 'This is the second comment.', userId: '1' },
	{ id: '3', comment: 'This is the third comment.', userId: '3' },
	{ id: '4', comment: 'This is the fourth comment.', userId: '5' },
	{ id: '5', comment: 'This is the last comment.', userId: '2' },
]

const moviesData = [
	{ id: '1', title: 'Big', year: 1987, userId: '1' },
	{ id: '2', title: 'Apollo 13', year: 1996, userId: '1' },
	{ id: '3', title: 'Road To Perdition', year: 2002, userId: '1' },
]
//#endregion

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

		posts: {
			type: new graphql.GraphQLList(PostType),
			resolve(parent, args) {
				return _.filter(postsData, { userId: parent.id })
			},
		},
		hobbies: {
			type: new graphql.GraphQLList(HobbyType),
			resolve(parent, args) {
				return _.filter(hobbiesData, { userId: parent.id })
			},
		},
		movies: {
			type: new graphql.GraphQLList(MovieType),
			resolve(parent, args) {
				return _.filter(moviesData, { userId: parent.id })
			},
		},
	}),
})

const HobbyType = new GraphQLObjectType({
	name: 'Hobby',
	description: 'Documentation for hobby',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(usersData, { id: parent.userId })
			},
		},
	}),
})

const PostType = new GraphQLObjectType({
	name: 'Post',
	description: 'Documentation for post',
	fields: () => ({
		id: { type: GraphQLID },
		comment: { type: GraphQLString },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(usersData, { id: parent.userId })
			},
		},
	}),
})

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	description: 'Documentation for movie',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		year: { type: GraphQLInt },
		user: {
			type: UserType,
			resolve(parent, args) {
				return _.find(usersData, { id: parent.userId })
			},
		},
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
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(moviesData, { id: args.id })
			},
		},
	},
})

// Mutations
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		createUser: {
			type: UserType,
			args: {
				// id: {type: GraphQLID},
				name: { type: GraphQLString },
				age: { type: GraphQLInt },
				profession: { type: GraphQLString },
			},
			resolve(parent, args) {
				const user = {
					name: args.name,
					age: args.age,
					profession: args.profession,
				}
				return user
			},
		},
		createPost: {
			type: PostType,
			args: {
				// id: {type: GraphQLInt},
				comment: { type: GraphQLString },
				resolve(parent, args) {
					// const post = {
					// 	comment: args.comment
					// }
					return {
						comment: args.comment,
					}
				},
			},
		},
		createHobby: {
			type: HobbyType,
			args: {
				// id: {type: GraphQLID},
				title: { type: GraphQLString },
				description: { type: GraphQLString },
				resolve(parent, args) {
					return {
						title: args.title,
						description: args.description,
					}
				},
			},
		},
		createMovie: {
			type: MovieType,
			args: {
				// id: {type: GraphQLID},
				title: { type: GraphQLString },
				year: { type: GraphQLInt },
				resolve(parent, args) {
					return {
						title: args.title,
						year: args.year,
					}
				},
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})
