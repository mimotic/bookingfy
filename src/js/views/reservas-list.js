var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    ReservaView  = require('../views/reserva-single'),
    Plantilla  = require('../partials/plantilla_reservas_tabla'),
    _          = require('underscore'),
    $          = require('jquery'),
    Filter  = require('../grid/modelfilter'),
    FormView  = require('../grid/formview'),
    CollectionView  = require('../grid/colecionview'),
    PageableCollection = require("backbone.paginator");


module.exports = Backbone.View.extend({
  el: $('#reservas_user'),

  template: Handlebars.compile(Plantilla.reservas_tabla),

  initialize: function () {
    // this.listenTo(this.collection, "add", this.render, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },
  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var self = this;

    // var html = this.template(self.collection);
    // this.$el.html(html);

    // console.log(self.collection);

    var flt = new Filter({collection: self.collection});

    console.log(flt.attributes);
    var inputView = new FormView({
        el: 'form',
        model: flt
    });

    var listView = new CollectionView({
        template: self.template, //_.template($('#template-list').html()),
        collection: flt.filtered
    });

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
  },

  ocultar: function () {
    this.$el.hide();
    $('#content').hide();
  }


});
