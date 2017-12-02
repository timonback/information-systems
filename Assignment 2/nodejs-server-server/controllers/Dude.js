'use strict';

var url = require('url');

var Dude = require('./DudeService');

module.exports.addDude = function addDude (req, res, next) {
  Dude.addDude(req.swagger.params, res, next);
};

module.exports.addFriend = function addFriend (req, res, next) {
  Dude.addFriend(req.swagger.params, res, next);
};

module.exports.deleteDude = function deleteDude (req, res, next) {
  Dude.deleteDude(req.swagger.params, res, next);
};

module.exports.findDudesByStatus = function findDudesByStatus (req, res, next) {
  Dude.findDudesByStatus(req.swagger.params, res, next);
};

module.exports.getDudeById = function getDudeById (req, res, next) {
  Dude.getDudeById(req.swagger.params, res, next);
};

module.exports.updateDudeWithForm = function updateDudeWithForm (req, res, next) {
  Dude.updateDudeWithForm(req.swagger.params, res, next);
};
