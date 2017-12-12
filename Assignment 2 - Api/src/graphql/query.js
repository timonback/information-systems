import {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from 'graphql';
import {dudeType, articleType} from './types';
import {resolveArticles, resolveArticle, resolveDudes, resolveDude} from './resolver';

const Query = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => 'world'
        },
        articles: {
            type: new GraphQLList(articleType),
            resolve: resolveArticles
        },
        article: {
            type: articleType,
            args: {
                articleId: {
                    name: 'id',
                    type: GraphQLInt
                }
            },
            resolve: resolveArticle
        },
        dudes: {
            type: new GraphQLList(dudeType),
            resolve: resolveDudes
        },
        dude: {
            type: dudeType,
            args: {
                dudeId: {
                    name: 'id',
                    type: GraphQLInt
                }
            },
            resolve: resolveDude
        },
    }
});

export default Query;