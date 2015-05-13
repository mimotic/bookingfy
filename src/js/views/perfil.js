var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_perfil'),
    Sesion     = require('../models/sesion');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#perfil'),

  template: Handlebars.compile(Plantilla.perfil),

  events: {
    'click #logotipoLink': 'goHome',
    'click #logout': 'logout',
    'click #user-welcome': 'goUserResume'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  getUserData: function (){
    var sesion = Sesion.getInstance();
    var usuario = sesion.attributes; //{};

    // if (sesion.get('mail') && sesion.get('apellidos')){
    //   usuario.nombre = sesion.get('nombre');
    //   usuario.apellidos = sesion.get('apellidos');
    //   usuario.dni = sesion.get('dni');
    //   usuario.expediente = sesion.get('expediente');
    //   usuario.mail = sesion.get('mail');
    //   usuario.apellidos = sesion.get('apellidos');
    //   usuario.password = '**********';
    // }

    return usuario;
  },

  clean: function () {
    this.$el.empty();
    return this;
  },

  render: function () {
    var usuario = this.getUserData();
    var html = this.template(usuario);
    this.$el.html(html);
    return this;
  },

});