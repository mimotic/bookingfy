var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'pista',

  events: {
    'click': 'navigate'
  },

  template: Handlebars.compile($("#pista-template").html()),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var pista = this.model.toJSON();
    var html = this.template(pista);
    this.$el.html(html);
    return this;
  },


  navigate: function () {
    // Backbone.app.navigate(this.model.get("name"), { trigger: true });
  }

});