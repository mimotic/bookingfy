var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    CalendarioView  = require('../views/calendario'),
    Plantilla  = require('../partials/plantilla__calendario'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#calendario'),

  template: Handlebars.compile(Plantilla.__calendario),

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

  addOne: function (calendario) {
    var calendarView = new CalendarioView({ model: calendario });
    this.$el.append(calendarView.render().el);
  }


});