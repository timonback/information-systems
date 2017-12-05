import {
  makeExecutableSchema,
} from 'graphql-tools';

import { resolvers } from './resolvers';

const typeDefs = `
  type Dude {
    id: Int!
    name: String
    articles: [Article] # the list of Articles by this author
  }

  type Article {
    id: Int!
    title: String
    dude: Dude
    votes: Int
  }

  # the schema allows the following query:
  type Query {
    articles: [Article]
    article(id: Int!): Article
    dudes: [Dude]
    dude(id: Int!): Dude
  }

  # this schema allows the following mutation:
  type Mutation {
    upvoteArticle (
      articleId: Int!
    ): Article
  }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export { schema };
