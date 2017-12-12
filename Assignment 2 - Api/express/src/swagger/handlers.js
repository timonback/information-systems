const articleService = require('../service/articleService');
const dudeService = require('../service/dudeService');

// Called by the swagger library, which maps the swagger configuration to these methods
module.exports = {
    addDude: function (req, res) {
        dudeService.addDude(req.body.name).then(dude => {
            res.status(200).json(dude);
        });
    },
    getArticleById: function (req, res) {
        return  articleService.findById(req.swagger.params.articleId).then(article => {
            return res.status(200).json(article);
        });
    },
    getDudeById: function (req, res) {
        return dudeService.findById(req.swagger.params.dudeId).then(dude => {
            res.status(200).json(dude);
        });
    },
    upvote: function (req, res) {
        return articleService.upvoteArticle(req.swagger.params.articleId).then(article => {
            return res.status(200).json(article);
        });
    }
};