import { find, filter } from 'lodash';

//const Dude = require('../model/dude');

// example data
const authors = [
    { id: 1, name: 'Tom'},
    { id: 2, name: 'Sashko' },
    { id: 3, name: 'Mikhail' },
];
let authorsId=authors.length;

const DudeService = function () {};

DudeService.prototype.addDude = function (name) {
    /*return Dude.create({name: name, friends: [], status: 'pending'})
        .then((dude) => {
            console.log(dude.get({
                plain: true
            }));
            return dude;
        });*/
    authors.push({id: ++authorsId, name: name});
};

DudeService.prototype.findAll = function () {
    //return Dude.findAll();
    return authors;
};

DudeService.prototype.findByArticle = function (article) {
    //return Dude.findOne({where: {article: article.id}});
    return find(authors, { id: article.authorId });
};

DudeService.prototype.findById = function (id) {
    //return Dude.findOne({where: {id: id}});
    return find(authors, { id: id });
};

DudeService.prototype.findByStatus = function (status) {
    return Dude.findAll({where: {status: status}});
};

module.exports = new DudeService();