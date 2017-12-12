import db from '../database/database';

// Service to abstract from the database
const ArticleService = function () {};

ArticleService.prototype.findAll = function () {
    return db.from('articles').then(articles => {
        return articles;
    });
};

ArticleService.prototype.findByDude = function (dude) {
    return db.where('dude_id', dude.id).from('articles').then(articles => {
        return articles;
    });
};

ArticleService.prototype.findDudeById = function(id) {
    return db.where('id', id).select('dude_id').from('articles').then(articles => {
        return db.where('id', articles[0].dude_id).from('dudes').then(dudes => {
            return dudes[0];
        });
    });
}

ArticleService.prototype.findById = function (id) {
    return db.where('dude_id', id).from('articles').then(articles => {
        return articles[0];
    });
};

ArticleService.prototype.upvoteArticle = function (articleId) {
    return db.where('id', articleId).from('articles').then(articles => {
        return db('articles').where('id', articleId).update( {
            votes: articles[0].votes +1
        }).then(() => {
            let article = articles[0];
            article.votes++; //Update does not return the updated object
            return article;
        });
    });
};

module.exports = new ArticleService();