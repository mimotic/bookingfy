var Backbone = require('backbone'),
    Calendario    = require('../models/calendario');

module.exports = Backbone.Collection.extend({
	url: '/api/pistas/',
  	model: Calendario
});