var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_reservas_tabla_admin'),
    PlantillaEmpty  = require('../partials/plantilla_reservas_tabla_empty'),
    _          = require('underscore'),
    $          = require('jquery'),
    Filter  = require('../gridreservas/modelfilter-admin'),
    FormView  = require('../gridreservas/formview'),
    CollectionView  = require('../gridreservas/colecionview'),
    PageableCollection = require("backbone.paginator");


module.exports = Backbone.View.extend({
  el: $('#reservas_admin'),

  ocultarBoton: $('#backBotones'),

  template: Handlebars.compile(Plantilla.reservas_tabla_admin),
  templateEmpty: Handlebars.compile(PlantillaEmpty.reservas_tabla_empty),

  initialize: function () {
    this.listenTo(this.collection, "reset", this.resetear, this);
  },
  resetear: function () {
    this.$el.empty();
    this.ocultarBoton.removeClass("onlyone");
  },

  render: function () {
    var self = this;

    var templateOps = self.template;

    var flt = new Filter({collection: self.collection});

    var inputView = new FormView({
        el: 'form',
        model: flt
    });

    var isCollection = flt.attributes.collection.models[0].attributes.estado;

    if(isCollection == 'error') templateOps = self.templateEmpty;

    console.log('flt.filtered',flt.filtered);

    var listView = new CollectionView({
        template: templateOps,
        collection: flt.filtered
    });

    this.ocultarBoton.addClass("onlyone");

    $('#reservas_admin').append(listView.render().el);
    $('#content').show();

  },

  // addOne: function (reserva) {
  //   var reservaView = new ReservaView({ model: reserva });
  //   this.$el.append(reservaView.render().el);
  // },

  mostrar: function () {
    this.$el.show();
    $('#content').show();
    this.ocultarBoton.addClass("onlyone");
  },

  ocultar: function () {
    this.$el.hide();
    $('#content').hide();
    this.ocultarBoton.removeClass("onlyone");
  }


});
