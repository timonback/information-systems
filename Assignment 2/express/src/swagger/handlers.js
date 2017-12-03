const dudeService = require('../service/dudeService');

module.exports = {
    addDude: function (req, res) {
        const dude = dudeService.addDude(req.body.name);
        return dude.then((dude) => {
            res.status(200).json(dude);
        });
    },
    addFriend: function (req, res) {
        const dude = dudeService.addFriend(req.swagger.params.dudeId, req.swagger.params.friendId);
        return dude.then((dude) => {
            res.status(200).json(dude);
        });
    },
    findDudesByStatus: function (req, res) {
        console.log(req);
        const dudes = dudeService.findByStatus(req.query.status);
        return dudes.then((dudes) => {
            res.status(200).json(dudes);
        });
    },
    getDudeById: function (req, res) {
        const dude = dudeService.findById(req.swagger.params.dudeId);
        return dude.then((dude) => {
            res.status(200).json(dude);
        });
    },
    updateDudeWithForm: function (req, res) {
        console.log('updateDudeWithForm', req.swagger);
        res.status(200).json({});
    },
    deleteDude: function (req, res) {
        console.log('deleteDude', req.swagger);
        res.status(200).json({});
    }
};