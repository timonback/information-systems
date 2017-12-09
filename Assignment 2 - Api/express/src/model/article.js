import {sequelize} from "../database";

const Sequelize = require('sequelize');

const Dude = require('./dude');

const Article = sequelize.define('article', {
    name: Sequelize.STRING,
    content: Sequelize.STRING
});
Article.hasMany(Dude, {foreignKey: 'authors'});

Article.sync();

module.exports = Article;