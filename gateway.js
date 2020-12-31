const path = require('path');
const { ApolloServer } = require("apollo-server");
const { ApolloGateway, LocalGraphQLDataSource } = require("@apollo/gateway");
const { buildFederatedSchema } = require("@apollo/federation");

const gateway = new ApolloGateway({
  serviceList: [
    { name: "account", url: "local://account" },
    { name: "accountSettings", url: "local://accountSettings" },
  ],
  buildService({ name, url }) {
    const moduleName = url.substring("local://".length);
    const serviceModule = require(path.join(__dirname, 'services', moduleName));
    const { typeDefs, resolvers } = serviceModule;
    const schema = buildFederatedSchema([{typeDefs, resolvers}]);
    return new LocalGraphQLDataSource(schema);
  },
});

(async () => {
  const server = new ApolloServer({ gateway, subscriptions: false });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
