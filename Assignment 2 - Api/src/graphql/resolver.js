const dudeService = require('../service/dudeService');
const articleService = require('../service/articleService');

// Resolvers //
export async function resolveArticles(rootValue, {} ){
    return articleService.findAll();
}

export async function resolveArticle(rootValue, {articleId} ){
    return articleService.findById(articleId);
}

export async function resolveDudes(rootValue, {} ){
    return dudeService.findAll();
}

export async function resolveDude(rootValue, {dudeId} ){
    return dudeService.findById(dudeId);
}

export async function resolveArticleUpvote(rootValue, {articleId} ){
    return articleService.upvoteArticle(articleId);
}