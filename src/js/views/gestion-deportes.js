var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_deporte'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_deportes'),

  template: Handlebars.compile(Plantilla.gestion_deporte),

  events : {
      "change input" :"changed"
  },

  initialize: function () {
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

  changed: function(e){
    console.log('modificado deporte', e.currentTarget.id);
    console.log('modificado deporte', e.currentTarget.value);
  },

  mostrar: function(){
    this.$el.show();

  },

  ocultar: function(){
    this.$el.hide();
  }

});
