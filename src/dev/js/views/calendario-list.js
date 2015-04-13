var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    HoraView  = require('../views/calendario-single'),
    $          = require('jquery');

module.exports = Backbone.View.extend({
  el: $('#calendario'),

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

  addOne: function (hora) {
    var horaView = new HoraView({ model: hora });
    this.$el.append(horaView.render().el);
  }

});
