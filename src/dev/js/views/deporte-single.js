var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_deporte'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  tagName: 'li',
  className: 'deporte',

  events: {
    'click': 'navigate'
  },

  template: Handlebars.compile( Plantilla.deporte ),


  initialize: function () {
    console.log( Plantilla.deporte );
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var deporte = this.model.toJSON();
    //deporte.name = deporte.name.replace('-', ' ');
    var html = this.template(deporte);
    this.$el.html(html);
    return this;
  },

  navigate: function () {
    Backbone.app.navigate( 'campus/' + this.model.get("name"), { trigger: true });
  }

});