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
    'click #cerrarModal': 'cancelar',
    'click': 'closeUp',
    'click #checkedluz': 'checkOn',
    'touchstart #checkedluz': 'checkOn',
    'click #activar-check-lus': 'fireClick',
    'touchstart #activar-check-lus': 'fireClick',
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  checkOn: function () {
    var check = $('#checkedluz');
    var luz = $(".icon_lucero");

    var isChecked = check.is(':checked');
    if(isChecked === true) luz.addClass(' on');
    else luz.removeClass('on');
  },

  fireClick: function() {
    console.log('click !!!!!');
    $('#checkedluz').click();
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



  reservar: function(event){
  	event.preventDefault();
    var self = this;
  	var reserva = this.model.toJSON();

    var withLight = '0';
    var isChecked = $('#checkedluz').is(':checked');
    if (isChecked === true) {
      withLight = '1';
    }
    console.log("luz = " + withLight);
    console.log(isChecked);


    console.log("RESERVAR", reserva);
    // coger check de luz

  	this.model.fetch({
  		data: {
          id_usuario: reserva.id_usuario,
          id_pista: reserva.id_pista,
          id_hora: reserva.id_hora,
          fecha_pista: reserva.fecha_pista,
		      luz: withLight,
          id_deporte: reserva.id_deporte
      },
  		type: 'POST',
  		success: function(model, response) {
            // console.log('RESERVADOOOOO');

            $('#modalCalendario div').html('<span class="response">' + response.msg + '</span>');

            setTimeout(function(){

              $('#modalCalendario').fadeOut();

              self.undelegateEvents();
              Backbone.Events.trigger('resetCalendar', reserva.id_deporte , reserva.fecha_pista );

            }, 2000);
            //
        },
        error: function(model, response) {
            // console.log('FALLOOOOOO');


            $('#modalCalendario div').html('<span class="response">'+response.msg+'</span>');

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