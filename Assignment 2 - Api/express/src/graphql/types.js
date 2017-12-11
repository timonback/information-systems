import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLList
} from 'graphql';

import dudeService from '../service/dudeService';
import articleService from '../service/articleService';

export const articleType = new GraphQLObjectType({
    name: 'Article',
    description: 'An article',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the id of the article'
        },
        title: {
            type: GraphQLString,
            description: 'the title of the article',
        },
        dude: {
            type: dudeType,
            description: 'the dude of the article',
            resolve: (obj, args, context) => {
                return articleService.findDudeById(obj.id)
            }
        },
        votes: {
            type: GraphQLInt,
            description: 'the amount of votes on the article',
        }
    })
});

export const dudeType = new GraphQLObjectType({
    name: 'Dude',
    description: 'A dude',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'the id of the dude'
        },
        name: {
            type: GraphQLString,
            description: 'the name of the dude',
        },
        articles: {
            type: new GraphQLList(articleType),
            description: 'the articles of the dude',
            resolve: (obj, args, context) => {
                return dudeService.findAllArticlesById(obj.id)
            }
        },
    })
});