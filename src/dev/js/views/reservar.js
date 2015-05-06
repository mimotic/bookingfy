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
    var self = this;
  	var reserva = this.model.toJSON();

    console.log("RESERVAR", reserva);
    // coger check de luz

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

            $('#modalCalendario div').html('<span>'+response.msg+'</span>');

            setTimeout(function(){
              $('#modalCalendario').fadeOut();
              Backbone.history.loadUrl();
              self.undelegateEvents();
              //Backbone.Events.trigger('resetCalendar', reserva.fecha_pista );
            }, 2000);
            //
        },
        error: function(model, response) {
            console.log('FALLOOOOOO');


            $('#modalCalendario div').html('<span>'+response.msg+'</span>');

            setTimeout(function(){
              $('#modalCalendario').fadeOut();
              self.undelegateEvents();
            }, 1500);

        }
    }).done();
  	// id_pista, id_usuario, id_hora, fecha, luz

  },

  cancelar: function(event){
  	event.preventDefault();
  	$('#modalCalendario').fadeOut();
  }

});