var Backbone = require('backbone'),
    Usuario    = require('../models/usuario');

module.exports = Backbone.Collection.extend({
	//urlRoot: 'http:80//localhost/',
	url: '/api/usuarios/',
  	model: Usuario
});