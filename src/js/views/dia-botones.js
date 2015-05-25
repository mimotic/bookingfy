var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_datepicker--data'),
    Dia = require('../models/dia-botones'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#datepicker-data'),

  events: {
    'click #misReservasUser2': 'goMisReservas',
    'click #goHomeUser2': 'goHome'
  },

  template: Handlebars.compile(Plantilla._datepickerdata),

  initialize: function () {
    this.render();
  },

  goMisReservas: function(event) {
    event.preventDefault();
    Backbone.app.navigate("misreservas", { trigger: true });
  },

  goHome: function(event) {
    event.preventDefault();
    Backbone.app.navigate("", { trigger: true });
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    // var dia = this.model.toJSON();
    var html = this.template();
    this.$el.html(html);
    return this;
  },


  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.html('');
  }

});