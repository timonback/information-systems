import {sequelize} from "../database";

const Sequelize = require('sequelize');

const Article = require('./article');

const Dude = sequelize.define('dude', {
    name: Sequelize.STRING,
    status: Sequelize.STRING
});
Dude.hasMany(Article, {foreignKey: 'articles'});

Dude.sync();

module.exports = Dude;