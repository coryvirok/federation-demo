const { gql } = require("apollo-server");

const typeDefs = gql`
  type AccountSettings @key(fields: "account { id }") {
    account: Account!
  }

  extend type Account @key(fields: "id") {
    id: ID! @external
    settings: AccountSettings!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers
}
