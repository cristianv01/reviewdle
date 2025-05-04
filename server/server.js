const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
})



server.listen({port:'4000'})
.then(({url}) => {
    console.log(`Server is running on ${url}`)
})