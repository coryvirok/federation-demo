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

const resolvers = {
  Account: {
    __resolveReference(object) {
      const { id } = object
      return { id }
    }
  },
  AccountSettings: {
    relatedAccounts(parent, {}, {}) {
      return [{id: 3}]
    }
  },
  Query: {
    accounts(parent, {}, {}) {
      return [
          {id: 42},
          {id: 2020}
      ]
    }
  }
};

module.exports = {
  typeDefs,
  resolvers
}
