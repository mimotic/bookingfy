var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_anular'),
    Sesion = require('../models/sesion'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#modalCalendario'),

  template: Handlebars.compile(Plantilla.anular),

  events: {
    'click #anularReserva': 'anular',
    'click #cerrarModal': 'cancelar',
    'click' : 'closeUp'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  closeUp: function(e){
    var self = this;
    var container = $("#inContentModal");
    if (!container.is(e.target) && container.has(e.target).length === 0) self.cancelar(e);
  },

  render: function () {
  	var reserva = this.model.toJSON();
    var html = this.template(reserva);
    this.$el.html(html).fadeIn();
    return this;
  },



  anular: function(event){
  	event.preventDefault();
    var self = this;
  	var anular = this.model.toJSON();

    // coger check de luz

    console.log("ANULAR", anular);

  	this.model.fetch({
  		data: {
          id_reserva: anular.id_reserva,
          fecha_pista: anular.fecha_pista,
          id_deporte: anular.id_deporte,
      },
  		type: 'PUT',
  		success: function(model, response) {
            // console.log('RESERVADOOOOO', response);

            $('#modalCalendario div').html('<span>'+response.msg+'</span>');

              $('#modalCalendario').fadeOut();

              console.log('fecha pista',anular.fecha_pista );

              self.undelegateEvents();

              if(anular.id_deporte !== undefined){
                Backbone.Events.trigger('resetCalendar', anular.id_deporte , anular.fecha_pista );
              }else{
                Backbone.Events.trigger('resetReservas');
              }
            //
        },
        error: function(model, response) {
            // console.log('FALLOOOOOO', response);
            console.log('MIMOTIC: error id reserva', anular.id_reserva);

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