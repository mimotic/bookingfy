var Backbone = require('backbone'),
    Deporte    = require('../models/deporte');

module.exports = Backbone.Collection.extend({
	url: '/api/deportes/',
  	model: Deporte
});