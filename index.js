// Importing dependencies
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
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

  const getUser = (token) => {
    if (token) {
      try {
        // Return the user information from the token
        return jwt.verify(token, process.env.JWT_SECRET);
      } catch (err) {
        // If there is an error throw new error
        throw new Error("Session invalid!");
      }
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    context: ({ req }) => {
      // Aquire the user;s token from the header
      const token = req.headers.authorization;

      // Try retreiving a user with the token
      const user = getUser(token);

      // Log user to console
      console.log(user);
      // Add database models and userto context
      return {
        models,
        user,
      };
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
