import db from '../database/database';

const DudeService = function () {};

DudeService.prototype.addDude = function (name) {
    return db.insert({name: name}).from('dudes').then(user => {
        return user;
    })
};

DudeService.prototype.findAll = function () {
    return db.from('dudes').then(dudes => {
        return dudes;
    });
};

DudeService.prototype.findAllArticlesById = function (id) {
    return db.where('id', id).select('id').from('dudes').then(dudes => {
        return db.where('dude_id', dudes[0].id).from('articles').then(articles => {
            return articles;
        });
    });
};

DudeService.prototype.findById = function (id) {
    return db.where('id', id).from('dudes').then(dudes => {
        return dudes[0];
    });
};

module.exports = new DudeService();