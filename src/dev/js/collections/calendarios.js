var Backbone = require('backbone'),
    Calendario    = require('../models/calendario');

module.exports = Backbone.Collection.extend({
	url: '/api/pistas/',
  	model: Calendario,

  	fecha: "",

	getFecha: function(){
		return this.fecha;
	},

	setFecha: function(newFecha){
		this.fecha = newFecha;
	}

});