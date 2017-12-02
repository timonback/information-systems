'use strict';

exports.addDude = function(args, res, next) {
  /**
   * Add a new dude to the list
   * 
   *
   * body Dude Dude object that needs to be added to the list
   * no response value expected for this operation
   **/
  args.
  res.end();
}

exports.addFriend = function(args, res, next) {
  /**
   * Add a friend to an existing dude
   * 
   *
   * dudeId Long ID of dude who has a new friend
   * friendId Long ID of new friend
   * no response value expected for this operation
   **/
  res.end();
}

exports.deleteDude = function(args, res, next) {
  /**
   * Deletes a dude
   * 
   *
   * dudeId Long Dude id to delete
   * api_key String  (optional)
   * no response value expected for this operation
   **/
  res.end();
}

exports.findDudesByStatus = function(args, res, next) {
  /**
   * Finds Dudes by status
   * Multiple status values can be provided with comma separated strings
   *
   * status List Status values that need to be considered for filter
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "name" : "lebombski",
  "id" : 0,
  "friends" : [ "" ],
  "status" : "available"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.getDudeById = function(args, res, next) {
  /**
   * Find dude by ID
   * Returns a single dude
   *
   * dudeId Long ID of dude to return
   * returns Dude
   **/
  var examples = {};
  examples['application/json'] = {
  "name" : "lebombski",
  "id" : 0,
  "friends" : [ "" ],
  "status" : "available"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateDudeWithForm = function(args, res, next) {
  /**
   * Updates a dude in the list with form data
   * 
   *
   * dudeId Long ID of dude that needs to be updated
   * name String Updated name of the dude (optional)
   * status String Updated status of the dude (optional)
   * no response value expected for this operation
   **/
  res.end();
}

