var Backbone = require('backbone'),
    ReservaUsuario    = require('../models/reserva-usuario');

Backbone.PageableCollection = require('backbone.paginator');

module.exports = Backbone.PageableCollection.extend({
	url: '/api/reservasUsuario/',
  	model: ReservaUsuario,
  	state: {
    	pageSize: 15
  	},
  	mode: "client"
});