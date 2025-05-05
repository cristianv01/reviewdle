const {ApolloServer, gql} = require('apollo-server');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const resolvers = require('./resolvers');

const typeDefs = gql(fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'));

const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    cors: corsOptions
})


const port =process.env.PORT || 4000;


server.listen({port})
.then(({url}) => {
    console.log(`Server is running on ${url}`)
})