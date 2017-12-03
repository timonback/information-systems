const database = require('../database');
const Dude = require('../model/dude');

const DudeService = function () {};

DudeService.prototype.log = function () {
    console.log('buzz!');
};

DudeService.prototype.addDude = function (name, friends, status) {
    Dude.create({name: name, friends: friends, status: status})
        .then((user) => {
            console.log(user.get({
                plain: true
            }));
        });
};

module.exports = new DudeService();