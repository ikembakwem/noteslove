const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
require("dotenv").config();

const db = require("./db");
const models = require("./models");

const port = process.env.PORT || 4000;
DB_HOST = process.env.DB_HOST;

async function main() {
  let notes = [
    {
      id: "1",
      content: "Hello would you like a soya milk",
      author: "Iya Gobe",
    },
    {
      id: "2",
      content: "Who needs a tiger nut, its fresh",
      author: "Iya Tishe",
    },
    { id: "3", content: "Let's make your deliveries", author: "Baba Jayce" },
    {
      id: "4",
      content: "Come let me teach you how to code",
      author: "Duru Ngafe",
    },
  ];

  const typeDefs = gql`
    type Note {
      id: ID!
      content: String!
      author: String!
    }

    type Query {
      hello: String
      notes: [Note!]!
      note(id: ID!): Note!
    }

    type Mutation {
      newNote(content: String!): Note!
      newNoteAndAuthor(content: String!, author: String!): Note!
    }
  `;

  const resolvers = {
    Query: {
      hello: () => "Hello graphQL, I just tested my first graph",
      notes: async () => {
        return await models.Note.find();
      },
      note: async (parent, args) => {
        return await models.Note.findById(args.id);
      },
    },
    Mutation: {
      newNote: async (parent, args) => {
        return await models.Note.create({
          content: args.content,
          author: "My Super Hero",
        });
      },
      newNoteAndAuthor: async (parent, args) => {
        return await models.Note.create({
          content: args.content,
          author: args.author,
        });
      },
    },
  };
  const app = express();

  db.connect(DB_HOST);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
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
