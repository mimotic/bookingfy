var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    DeporteView  = require('../views/deporte-single'),
    $          = require('jquery');

module.exports = Backbone.View.extend({
  el: $('#deportes'),

  template: Handlebars.compile($("#deporte-template").html()),

  initialize: function () {
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.reset, this);
  },

  reset: function () {
    this.$el.empty();
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (deporte) {
    var deporteView = new DeporteView({ model: deporte });
    this.$el.append(deporteView.render().el);
  }

});
