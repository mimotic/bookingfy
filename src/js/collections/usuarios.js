var Backbone = require('backbone'),
    Usuario    = require('../models/usuario'),
    PageableCollection = require("backbone.paginator");

    PageableCollection = Backbone.PageableCollection;

module.exports = Backbone.PageableCollection.extend({
	url: '/api/usuarios/',
  	model: Usuario,
  	state: {
	    pageSize: 500,
	    sortKey: "updated",
	    order: 1
  	},
  	mode: "client"
});