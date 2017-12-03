import {sequelize} from "../database";

const Sequelize = require('sequelize');

const Dude = sequelize.define('dude', {
    name: Sequelize.STRING,
    friends: {
        type: Sequelize.STRING,
        get: function() {
            const value = this.getDataValue('friends');
            if(value !== undefined && value !== null) {
                return JSON.parse(value);
            }
            return {}
        },
        set: function(val) {
            return this.setDataValue('friends', JSON.stringify(val));
        }
    },
    status: Sequelize.STRING
});

Dude.sync();

module.exports = Dude;