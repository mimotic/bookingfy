var Backbone = require('backbone'),
    ReservaUsuario    = require('../models/reserva-usuario');

    var PageableCollection = require("backbone.paginator"),
    BackgridFilter = require('backgrid-filter'),
    Backgrid   = require('backgrid');

    PageableCollection = Backbone.PageableCollection;

module.exports = Backbone.PageableCollection.extend({
	url: '/api/reservasUsuario/',
  	model: ReservaUsuario,
  	state: {
	    pageSize: 5,
	    sortKey: "updated",
	    order: 1
  	},
  	mode: "client"
});