var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_header');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#header'),

  template: Handlebars.compile(Plantilla.header),

  events: {
    'click .logotipoLink': 'goHome',
    //'click .logout': 'logout'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var html = this.template();
    this.$el.html(html).effect( "slide" , {} , 500 );
    return this;
  },

  goHome: function () {
    Backbone.app.navigate("/", { trigger: true });
  },

  logout: function () {
    // Backbone.app.navigate("/", { trigger: true });
  }

});