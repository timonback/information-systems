const articleService = require('../service/articleService');
const dudeService = require('../service/dudeService');

module.exports = {
    addDude: function (req, res) {
        const dude = dudeService.addDude(req.body.name);
        res.status(200).json(dude);
    },
    addFriend: function (req, res) {
        const dude = dudeService.addFriend(req.swagger.params.dudeId, req.swagger.params.friendId);

        res.status(200).json(dude);
    },
    findDudesByStatus: function (req, res) {
        console.log(req);
        const dudes = dudeService.findByStatus(req.query.status);

        res.status(200).json(dudes);
    },
    getArticleById: function (req, res) {
        const article = articleService.findById(req.swagger.params.articleId);

        res.status(200).json(article);
    },
    getDudeById: function (req, res) {
        const dude = dudeService.findById(req.swagger.params.dudeId);

        res.status(200).json(dude);
    },
    updateDudeWithForm: function (req, res) {
        console.log('updateDudeWithForm', req.swagger);
        res.status(200).json({});
    },
    deleteDude: function (req, res) {
        console.log('deleteDude', req.swagger);
        res.status(200).json({});
    },
    upvote: function (req, res) {
        const article = articleService.upvoteArticle(req.swagger.params.articleId);

        res.status(200).json(article);
    }
};