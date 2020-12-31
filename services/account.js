const { gql } = require("apollo-server");

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
  }

  extend type AccountSettings @key(fields: "account { id }") {
    # This @external causes the GraphQL parser to halt with
    # https://github.com/apollographql/apollo-server/issues/4378
    account: Account! @external

    relatedAccounts: [Account]!
  }

  extend type Query {
    accounts: [Account]!
  }
`;

const resolvers = {};

module.exports = {
  typeDefs,
  resolvers
}
