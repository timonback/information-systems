module.exports = {
    addDude: function (req, res) {
        console.log('getUsers', req.swagger);
        res.status(200).json([]);
    },
    addFriend: function (req, res) {
        console.log('postUser', req.swagger);
        res.status(200).json({});
    },
    findDudesByStatus: function (req, res) {
        console.log('getUser', req.swagger);
        res.status(200).json({});
    },
    getDudeById: function (req, res) {
        console.log('getUser', req.swagger);
        res.status(200).json({});
    },
    updateDudeWithForm: function (req, res) {
        console.log('getUser', req.swagger);
        res.status(200).json({});
    },
    deleteDude: function (req, res) {
        console.log('getUser', req.swagger);
        res.status(200).json({});
    }
};