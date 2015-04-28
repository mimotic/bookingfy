var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_header'),
    Sesion = require('../models/sesion');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#header'),

  template: Handlebars.compile(Plantilla.header),

  events: {
    'click #logotipoLink': 'goHome',
    'click #logout': 'logout'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var html = this.template();
    this.$el.html(html).effect( "slide" , {} , 500 );
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
  }

});