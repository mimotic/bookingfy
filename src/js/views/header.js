var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_header'),
    PlantillaAdmin  = require('../partials/plantilla_header_admin'),
    Sesion     = require('../models/sesion');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#header'),

  template: Handlebars.compile(Plantilla.header),
  templateAdmin: Handlebars.compile(PlantillaAdmin.header),

  events: {
    'click #logotipoLink': 'goHome',
    'click #logout': 'logout',
    'click #user-welcome': 'goUserResume',
    'click #reservasAdmin': 'goreservas'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  getUserName: function (){
    var sesion = Sesion.getInstance();
    var usuario = {};

    if (sesion.get('nombre') && sesion.get('apellidos')){
      usuario.nombre = sesion.get('nombre');
      usuario.apellidos = sesion.get('apellidos');
      usuario.rol = sesion.get('rol');
    }

    return usuario;
  },

  render: function () {
    var html = {};
    var usuario = this.getUserName();

    if (Number(usuario.rol) === 1) html = this.templateAdmin(usuario);
    else  html = this.template(usuario);

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

  goreservas: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/reservasUsuarios", { trigger: true });
  },

  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }

});