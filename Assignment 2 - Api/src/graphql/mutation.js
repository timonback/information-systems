import {GraphQLObjectType, GraphQLInt} from 'graphql';
import {articleType} from './types';
import {resolveArticleUpvote} from './resolver';

const Mutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        upvoteArticle: {
            type: articleType,
            args: {
                articleId: {
                    name: 'articleId',
                    type: GraphQLInt
                }
            },
            resolve: resolveArticleUpvote
        }
    }
});

export default Mutation;