import { makeExecutableSchema } from "graphql-tools";
import Resolvers from "../graphql/resolvers";
import Schema from "../graphql/schema";
import auth from "../graphql/auth";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = process.env;
import { SubscriptionServer } from "subscriptions-transport-ws";
import { execute, subscribe } from "graphql";

export default utils => server => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    resolvers: Resolvers.call(utils),
    schemaDirectives: {
      auth: auth
    }
  });

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: executableSchema
    },
    {
      server,
      path: "/subscriptions"
    }
  );
};
