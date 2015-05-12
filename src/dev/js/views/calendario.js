var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla__calendario'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Sesion     = require('../models/sesion'),
    Reserva     = require('../models/reserva'),
    ReservaView = require('../views/reservar'),
    Anular     = require('../models/anular-reserva'),
    AnularView = require('../views/anular'),
    _          =  require('underscore'),
    Moment        = require('moment');


module.exports = Backbone.View.extend({

  tagName: 'div',
  // className: 'tipo-calendario',
  className: function (){
    // ya no funciona al cambiar logica, camabiar
    var calendario = this.model.toJSON();
    var numeroPistas = calendario.numeroPistas;
    numeroPistas = (numeroPistas == 1)? 'simple' : 'doble';
    return 'tipo-calendario ' + numeroPistas;
  },

   events: {
    'click [data-estado="libre"]': 'reservar',
    'click [data-estado="owner"]': 'anular'
  },

  template: Handlebars.compile(Plantilla.__calendario),


  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var calendario = this.model.toJSON();
    var sesion = Sesion.getInstance();
    var id_rest_usuario = 0;

    if (Number(sesion.get('rol')) == 0) id_rest_usuario = Number(sesion.get('id_usuario'));

    for (var i = 0; i < calendario.horas.length; i++) {
       calendario.horas[i].id_usuario = Number(calendario.horas[i].id_usuario);
      if(id_rest_usuario == calendario.horas[i].id_usuario) calendario.horas[i].id_usuario = 'owner';
      else if(calendario.horas[i].id_usuario > 0) calendario.horas[i].id_usuario = 'ocupado';
      else calendario.horas[i].id_usuario = 'libre';
    }

    var html = this.template(calendario);
    this.$el.html(html);
    return this;
  },

  getDateUrl: function(){

    var f = window.location.href;

    f = f.split("/");
    f = _.last(f).trim();
    isF = Moment(f, 'YYYY-MM-DD', true).isValid();

    if (isF === false) f = Moment().format('YYYY-MM-DD');

    return f;
  },

  reservar: function (event) {
    // var msg = 'Reservar: ' + $(event.currentTarget).attr('data-hora');
    // var confirm = $('#modalCalendario');
    // var confirmWrap = $('#modalCalendario div');

    // // mostrar modal
    // confirmWrap.append(msg);
    // confirm.fadeIn();

    // console.log("FECHA CALENDARIO", this.model.collection.getFecha());



    var horaClicked = $(event.currentTarget).attr('data-hora');
    var idHoraClicked = 0;


    // console.log("MODELO CALENDARIO", this.model);
    var calendario = this.model.toJSON();
    // console.log("ID PISTA", calendario.id);

    for (var i = 0; i < calendario.horas.length; i++) {
        if(horaClicked == calendario.horas[i].inicio){
          idHoraClicked = calendario.horas[i].id;
        }
    }

    var f = this.getDateUrl();

    // console.log("ID HORA", idHoraClicked);

    var sesion = Sesion.getInstance();
    // if (sesion.get('id_usuario')) {
        // console.log("ID USER", sesion.get('id_usuario'));
    // }

    this.reserva = new Reserva();

    this.reserva.clear();

    this.reserva.set({
      id_usuario: sesion.get('id_usuario'),
      id_pista: calendario.id,
      id_hora: idHoraClicked,
      fecha_pista: this.model.collection.getFecha(),
      luz: '0',
      nombre_pista: calendario.nombre,
      precio: calendario.precio_pista,
      precio_luz: calendario.precio_luz,
      hora: horaClicked
    });

    this.reservaview = new ReservaView({ model: this.reserva });

    // JQRY UI ¿?¿? TO-DO
    // confirmWrap.append(msg).show( "puff" , {} , 300 );

  },

  anular: function (event) {
    var horaClicked = $(event.currentTarget).attr('data-hora');
    var idHoraClicked = 0;
    var idReserva = 0;
    var calendario = this.model.toJSON();

    for (var i = 0; i < calendario.horas.length; i++) {
        if(horaClicked == calendario.horas[i].inicio){
          idHoraClicked = calendario.horas[i].id;
          idReserva = calendario.horas[i].id_reserva;
        }
    }

    this.anular = new Anular();

    this.anular.clear();

    this.anular.set({
        id_reserva: idReserva,
        id_hora: idHoraClicked,
        hora: horaClicked
    });

    this.anularview = new AnularView({ model: this.anular });

    // alert('Anular: ' + idHoraClicked + ' - idreserva: ' + idReserva);
  }



});