import {
  makeExecutableSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
    type Dude {
      id: ID!                # "!" denotes a required field
      name: String
      friends: [Int]
      status: String
    }

    # This type specifies the entry points into our API.
    type Query {
      dudes: [Dude]    # "[]" means this is a list of channels
      dude(id: ID!): Dude
      dudesByStatus(status: String!): [Dude]
    }

    # The mutation root type, used to define all mutations.
    type Mutation {
      addDude(name: String!): Dude
      addFriend(id: Int, friend: Int): Dude
    }
    `;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
