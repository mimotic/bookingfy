var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla__calendario'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Sesion     = require('../models/sesion'),
    _          =  require('underscore');

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

  reservar: function (event) {
    var msg = 'Reservar: ' + $(event.currentTarget).attr('data-hora');
    var confirm = $('#modalCalendario');
    var confirmWrap = $('#modalCalendario div');

    // mostrar modal
    confirmWrap.append(msg);
    confirm.fadeIn();


    // JQRY UI ¿?¿? TO-DO
    // confirmWrap.append(msg).show( "puff" , {} , 300 );

  },
  anular: function (event) {
    alert('Anular: ' + $(event.currentTarget).attr('data-hora'));
  }



});