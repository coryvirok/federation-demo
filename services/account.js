const { gql } = require("apollo-server");

const typeDefs = gql`
  type Account @key(fields: "id") {
    id: ID!
  }

  extend type AccountSettings @key(fields: "account { id }") {
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
