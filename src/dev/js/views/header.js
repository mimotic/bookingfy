var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_header'),
    Sesion     = require('../models/sesion');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#header'),

  template: Handlebars.compile(Plantilla.header),

  events: {
    'click #logotipoLink': 'goHome',
    'click #logout': 'logout',
    'click #user-welcome': 'goUserResume'
  },

  initialize: function () {
    this.render();
    console.log('userName??' , this.getUserName());
  },

  resetear: function () {
    this.$el.empty();
  },

  getUserName: function (){
    var sesion = Sesion.getInstance();
    console.log('sesion' , sesion.attributes);
    var usuario = {};

    if (sesion.get('nombre') && sesion.get('apellidos')){
      usuario.nombre = sesion.get('nombre');
      usuario.apellidos = sesion.get('apellidos');
    }

    return usuario;
  },

  render: function () {
    var usuario = this.getUserName();
    var html = this.template(usuario);
    this.$el.html(html);
    return this;
  },

  goHome: function (event) {
    event.preventDefault();
    Backbone.app.navigate("", { trigger: true });
  },

  logout: function (event) {
    event.preventDefault();

    Sesion.destroySesion();
    var sesion = Sesion.getInstance();
    Backbone.app.navigate("/login", { trigger: true });
  },

  goUserResume: function(event){
    event.preventDefault();
    Backbone.app.navigate("/perfil", { trigger: true });
  },

  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }

});