// Importing dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
require("dotenv").config();

// Importing modules
const db = require("./db");
const models = require("./models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const port = process.env.PORT || 4000;
DB_HOST = process.env.DB_HOST;

async function main() {
  const app = express();

  db.connect(DB_HOST);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: () => {
      // Adding database models to context
      return { models };
    },
  });
  await server.start();
  server.applyMiddleware({ app, path: "/api" });

  app.listen({ port }, () =>
    console.log(
      `GraphQL Server currently running at http://localhost:${port}${server.graphqlPath}`
    )
  );
}

main();
