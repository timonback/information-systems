const articleService = require('../service/articleService');
const dudeService = require('../service/dudeService');


export const resolvers = {
    Query: {
        articles: () => articleService.findAll(),
        article: (_, { id }) => articleService.findById(id),
        dudes: () => dudeService.findAll(),
        dude: (_, { id }) => dudeService.findById(id),
    },
    Mutation: {
        upvoteArticle: (_, { articleId }) => {
            articleService.upvoteArticle(articleId)
        },
    },
    Dude: {
        articles: (dude) => articleService.findByDude(dude),
    },
    Article: {
        dude: (article) => dudeService.findByArticle(article),
    },
};
