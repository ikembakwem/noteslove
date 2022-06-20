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

  const express = require("express");
  const { ApolloServer, gql } = require("apollo-server-express");

  const port = process.env.PORT || 4000;

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
      newNote(content: String!): Note
    }
  `;

  const resolvers = {
    Query: {
      hello: () => "Hello graphQL, I just tested my first graph",
      notes: () => notes,
      note: (parent, args) => {
        return notes.find((note) => note.id === args.id);
      },
    },
    Mutation: {
      newNote: (parent, args) => {
        let noteValue = {
          id: String(notes.length + 1),
          content: args.content,
          author: "My Super Hero",
        };
        notes.push(noteValue);
        return noteValue;
      },
    },
  };

  const app = express();

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
