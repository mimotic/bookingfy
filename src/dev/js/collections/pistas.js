var Backbone = require('backbone'),
    Pista    = require('../models/pista');

module.exports = Backbone.Collection.extend({
	url: '/api/pistas/',
  	model: Pista
});