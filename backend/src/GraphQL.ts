import {ApolloServer} from 'apollo-server-lambda'
import {resolvers} from './models/graphQL/resolvers'
import {typeDefs} from './models/graphQL/typeDefs'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    allowedHeaders: ['content-type'],
  },
})
