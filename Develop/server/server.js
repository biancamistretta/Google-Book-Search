const express = require('express');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./auth'); // Import your authentication middleware
const { typeDefs, resolvers } = require('./schemas'); // Import your GraphQL type definitions and resolvers
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Pass the request object to the context so authMiddleware can access it
      return { req };
    },
  });

  await server.start();

  // Apply Apollo Server middleware to Express
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // If we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // Apply authentication middleware
  app.use(authMiddleware);

  // Add your existing routes here if needed

  await new Promise(resolve => db.once('open', resolve));
  await new Promise(resolve => app.listen({ port: PORT }, resolve));

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startServer().catch(error => {
  console.error('Server error:', error);
});
