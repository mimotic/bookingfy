var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#login'),

  // events: {
  //   'click': 'navigate'
  // },

  template: Handlebars.compile($("#login-template").html()),

  initialize: function () {
    // this.listenTo(this.model, "change", this.render, this);
    this.render();

   // Backbone.emulateHTTP = true;
    var Prueba;

    Prueba = new Usuarios().fetch();

    console.log('mosadasd');
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