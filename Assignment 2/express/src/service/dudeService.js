const Dude = require('../model/dude');

const DudeService = function () {};

DudeService.prototype.addDude = function (name) {
    return Dude.create({name: name, friends: [], status: 'pending'})
        .then((dude) => {
            console.log(dude.get({
                plain: true
            }));
            return dude;
        });
};

DudeService.prototype.addFriend = function (id, friendId) {
    let dudePromise = this.findById(id);
    return dudePromise.then((dude) => {
        if(!dude.friends.includes(friendId)) {
            const friends = [friendId].concat(dude.friends);
            dude.friends = friends;
            return dude.save({fields: ['friends']})
                .then((dude) => {
                    return dude;
                });
        }
        return dude;
    });
};

DudeService.prototype.findAll = function () {
    return Dude.findAll();
};

DudeService.prototype.findById = function (id) {
    return Dude.findOne({where: {id: id}});
};

DudeService.prototype.findByStatus = function (status) {
    return Dude.findAll({where: {status: status}});
};

module.exports = new DudeService();