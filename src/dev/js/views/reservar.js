var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_reserva'),
    Sesion = require('../models/sesion'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#modalCalendario'),

  template: Handlebars.compile(Plantilla.reserva),

  events: {
    'click #confirmarReserva': 'reservar',
    'click #cerrarModal': 'cancelar'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
  	var reserva = this.model.toJSON();
    var html = this.template(reserva);
    this.$el.html(html).fadeIn();
    return this;
  },

  reservar: function(event){
  	event.preventDefault();
  	var reserva = this.model.toJSON();

  	this.model.fetch({
  		data: {
          id_usuario: reserva.id_usuario,
          id_pista: reserva.id_pista,
          id_hora: reserva.id_hora,
          fecha_pista: reserva.fecha_pista,
		  luz: reserva.luz
        },
  		type: 'POST',
  		success: function(model, response) {
            console.log('RESERVADOOOOO');
            $('#modalCalendario').fadeOut();
        },
        error: function(model, response) {
            console.log('FALLOOOOOO');
        }
    });
  	// id_pista, id_usuario, id_hora, fecha, luz

  },

  cancelar: function(event){
  	event.preventDefault();
  	$('#modalCalendario').fadeOut();
  }

});