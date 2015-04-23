var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    HoraView  = require('../views/calendario-single'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  tagName: 'ul',
  className: 'tipo-pistas',

  el: $('#calendario'),

  // template: Handlebars.compile($("#pista-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    this.$el.append("<ul class='tipo-pistas text-center'>");
    this.collection.forEach(this.addOne, this);
    this.$el.append("</ul>");
    console.log($el);
  },

  addOne: function (hora) {
    var horaView = new HoraView({ model: hora });
    this.$el.append(horaView.render().el);
  }

});