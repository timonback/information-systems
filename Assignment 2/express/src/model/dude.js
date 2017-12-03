import {sequelize} from "../database";

const Sequelize = require('sequelize');

const Dude = sequelize.define('dude', {
    name: Sequelize.STRING,
    friends: {
        type: Sequelize.STRING,
        get: function() {
            const value = this.getDataValue('friends');
            if (value !== undefined && value !== null) {
                const res = JSON.parse(value);
                return res;
            }
            return [];
        },
        set: function(val) {
            const res = JSON.stringify(val);
            return this.setDataValue('friends', res);
        }
    },
    status: Sequelize.STRING
});

Dude.sync();

module.exports = Dude;