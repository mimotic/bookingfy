var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_calendario');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'hora',

  // events: {
  //   'click': 'navigate'
  // },

  template: Handlebars.compile(Plantilla.calendario),

  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var hora = this.model.toJSON();
    var html = this.template(hora);
    this.$el.html(html);
    return this;
  },


  navigate: function () {
    // Backbone.app.navigate(this.model.get("name"), { trigger: true });
  }

});