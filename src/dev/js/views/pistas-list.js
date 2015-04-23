var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    PistaView  = require('../views/pista-single'),
    Plantilla  = require('../partials/plantilla_pista'),
    $          = require('jquery');

module.exports = Backbone.View.extend({
  el: $('#pistas'),

  template: Handlebars.compile(Plantilla.pista),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (pista) {
    var pistaView = new PistaView({ model: pista });
    this.$el.append(pistaView.render().el);
  }

});