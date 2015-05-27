var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    ReservaView  = require('../views/reserva-single'),
    Plantilla  = require('../partials/plantilla_reservas_tabla'),
    PlantillaEmpty  = require('../partials/plantilla_reservas_tabla_empty'),
    _          = require('underscore'),
    $          = require('jquery'),
    Filter  = require('../gridreservas/modelfilter'),
    FormView  = require('../gridreservas/formview'),
    CollectionView  = require('../gridreservas/colecionview'),
    PageableCollection = require("backbone.paginator");


module.exports = Backbone.View.extend({
  el: $('#reservas_user'),

  ocultarBoton: $('#backBotones'),

  template: Handlebars.compile(Plantilla.reservas_tabla),
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

    $('#reservas_user').append(listView.render().el);
    $('#content').show();

  },

  addOne: function (reserva) {
    var reservaView = new ReservaView({ model: reserva });
    this.$el.append(reservaView.render().el);
  },

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
