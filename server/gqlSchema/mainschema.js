var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var gqlSchema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Users {
    getMessage(): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

export default gqlSchema