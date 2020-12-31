const { gql } = require("apollo-server");

const typeDefs = gql`
  type AccountSettings @key(fields: "account { id }") {
    account: Account!
  }

  extend type Account @key(fields: "id") {
    settings: AccountSettings!
  }
`;

const resolvers = {
  AccountSettings: {
    __resolveReference(object) {
      return {account: {id: 42} }
    }
  },
};

const foos = [
  {
    id: "1",
    name: "Ada Lovelace",
    bars: [{id: 42}, {id: 41}, {id: 40}]
  },
  {
    id: "2",
    name: "Alan Turing",
    bars: [{id: 42}]
  }
];

module.exports = {
  typeDefs,
  resolvers
}
