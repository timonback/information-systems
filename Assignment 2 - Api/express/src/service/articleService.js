import { find, filter } from 'lodash';

//const Article = require('../model/article');

const articles = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const ArticleService = function () {};

/*ArticleService.prototype.add = function (name, author) {
    return Article.create({name: name, content: 'asdf'})
        .then((dude) => {
            console.log(dude.get({
                plain: true
            }));
            return dude;
        });
};*/

ArticleService.prototype.findAll = function () {
    //return Article.findAll();
    return articles;
};

ArticleService.prototype.findByDude = function (dude) {
    //return Article.findOne({where: {articles: dude.id}});
    return filter(articles, { authorId: dude.id });
};

ArticleService.prototype.findById = function (id) {
    return find(articles, {id: id});
    //return Article.findOne({where: {id: id}});
};

ArticleService.prototype.upvoteArticle = function (id) {
    let article = this.findById(id);
    article.votes++;
    return article;
    //return Article.findOne({where: {id: id}});
};

module.exports = new ArticleService();