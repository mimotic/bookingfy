var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_reserva_user'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'reservuser',

  events: {
    'click': 'navigate'
  },

  template: Handlebars.compile( Plantilla.reserva_user ),


  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var reserva = this.model.toJSON();
    var html = this.template(reserva);
    this.$el.html(html);
    return this;
  },

  navigate: function () {
  }

});