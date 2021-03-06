const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    avatar: String
    notes: [Note!]!
  }

  type Query {
    notes: [Note!]!
    note(id: ID!): Note!
  }

  type Mutation {
    newNote(content: String!): Note!
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    signUp(email: String!, username: String!, password: String!): String!
    signIn(email: String, username: String!, password: String!): String!
  }
`;
