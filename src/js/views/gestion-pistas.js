var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_pista'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_pistas'),

  template: Handlebars.compile(Plantilla.gestion_pista),

  initialize: function () {
    // this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var models = {models: this.collection.toJSON()};
    var html = this.template(models);
    this.$el.html(html);
    return this;
  },

  mostrar: function(){
    this.$el.show();

  },

  ocultar: function(){
    this.$el.hide();
  }

});
