var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    _          = require('underscore'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_menu_boton_responsive'),
    Sesion     = require('../models/sesion');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#botonMenuresponsive-wrapper'),

  template: Handlebars.compile(Plantilla.menu_boton),

  events: {
    'click #menu-boton-responsive': 'toggleMenu',
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

  toggleMenu: function (event) {
    if(event) event.preventDefault();
    Backbone.Events.trigger('clickAdminButtomMenu');
  },

  mostrar: function(){
    this.render();
  },

  ocultar: function(){
    this.$el.empty();
  }

});