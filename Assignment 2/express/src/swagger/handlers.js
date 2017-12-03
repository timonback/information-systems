const dudeService = require('../service/dudeService');

module.exports = {
    addDude: function (req, res) {
        dudeService.addDude(req.body.name, req.body.friends, req.body.status);
        console.log('addDude', req.body);
        res.status(200).json([]);
    },
    addFriend: function (req, res) {
        console.log('addFriend', req.swagger);
        res.status(200).json({});
    },
    findDudesByStatus: function (req, res) {
        console.log('findDudesByStatus', req.swagger);
        res.status(200).json({});
    },
    getDudeById: function (req, res) {
        console.log('getDudeById', req.swagger);
        res.status(200).json({});
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