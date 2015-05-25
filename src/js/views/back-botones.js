var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    _          = require('underscore'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_perfilbackBotones'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#backBotones'),

  template: Handlebars.compile(Plantilla.perfilbackBotones),

  events: {
    'click #misReservasUser2': 'goMisReservas',
    'click #goHomeUser2': 'goHome'
  },

  initialize: function () {
    this.render();
  },

  goMisReservas: function (event) {
    event.preventDefault();
    Backbone.app.navigate("/misreservas", { trigger: true });
  },

  goHome: function(event) {
    event.preventDefault();
    Backbone.app.navigate("", { trigger: true });
  },

  resetear: function () {
    this.$el.empty();
  },

  clean: function () {
    this.$el.empty();
    return this;
  },

  render: function () {
    var html = this.template();
    this.$el.html(html).show();
    return this;
  }

});