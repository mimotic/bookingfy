var Backbone = require('backbone'),
    ReservaUsuario    = require('../models/reserva-usuario');

module.exports = Backbone.Collection.extend({
	url: '/api/reservasUsuario/',
  	model: ReservaUsuario,
  	mode: "client"
});