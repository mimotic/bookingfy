var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'deporte',

  events: {
    'click': 'navigate'
  },

  template: Handlebars.compile($("#deporte-template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var deporte = this.model.toJSON();
    var html = this.template(deporte);
    this.$el.html(html);
    return this;
  },

  navigate: function () {
    Backbone.app.navigate("deporte/" + this.model.get("name"), { trigger: true });
  }

});