var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_calendario');

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'hora',

  events: {
    'click': 'reservar'
  },

  template: Handlebars.compile( Plantilla.calendario ),


  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var hora = this.model.toJSON();
    var html = this.template(hora);
    this.$el.html(html);
    return this;
  },

  reservar: function () {

    alert('this.model.toJSON().estado');
    // Backbone.app.navigate( 'campus/' + this.model.get("name"), { trigger: true });
  }

});
