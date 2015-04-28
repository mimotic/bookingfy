var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_reserva'),
    Sesion = require('../models/sesion'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#reservas'),

  template: Handlebars.compile(Plantilla.reserva),

  events: {
    'click #reservar': 'reservar',
    'click #cancelar': 'cancelar'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    return this;
  },

  reservar: function(){
  	// id_pista, id_usuario, id_hora, fecha, luz

  },

  cancelar: function(){

  }

});