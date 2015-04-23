var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_registro'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#registro'),

  // events: {
  //   'click': 'navigate'
  // },

  template: Handlebars.compile(Plantilla.registro),

  initialize: function () {
    // this.listenTo(this.model, "change", this.render, this);
    this.render();
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    return this;
  },


  navigate: function () {
    // Backbone.app.navigate(this.model.get("name"), { trigger: true });
  }

});