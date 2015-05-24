var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    DeporteView  = require('../views/deporte-single'),
    Plantilla  = require('../partials/plantilla_deporte'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#deportes'),

  padreItem: $('.deportes-tipo-pistas2'),

  misReservas: $('#misReservasUser'),

  template: Handlebars.compile(Plantilla.deporte),

  initialize: function () {
    this.misReservas.on('click',function(event) {
      event.preventDefault();
      Backbone.app.navigate("/misreservas", { trigger: true });
    });
    this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
    this.padreItem.hide();
  },

  render: function () {
    this.collection.forEach(this.addOne, this);
  },

  addOne: function (deporte) {
    var deporteView = new DeporteView({ model: deporte });
    this.$el.append(deporteView.render().el);
  },

  mostrar: function(){
    this.padreItem.show();
    this.$el.show();

  },

  ocultar: function(){
    this.$el.hide();
    this.padre.hide();
  }

});
