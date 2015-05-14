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
    'click #doactualizar': 'actualizarDatos'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  getUserData: function (){
    var sesion = Sesion.getInstance();
    var usuario = sesion.attributes;
    return usuario;
  },

  actualizarDatos: function (event) {
    if(event) event.preventDefault();
    alert('actualizar !!!');
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