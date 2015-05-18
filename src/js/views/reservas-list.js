var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    ReservaView  = require('../views/reserva-single'),
    Plantilla  = require('../partials/plantilla_reserva_user'),
    _          = require('underscore'),
    $          = require('jquery'),
    BackgridFilter = require('backgrid-filter'),
    Backgrid   = require('backgrid');
    var Paginator = require('backgrid-paginator');
    var ClientSideFilter = require('backgrid-filter');


module.exports = Backbone.View.extend({
  el: $('#reservas_user'),

  template: Handlebars.compile(Plantilla.reserva_user),

  initialize: function () {
    // this.listenTo(this.collection, "add", this.render, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },
  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    // this.collection.forEach(this.addOne, this);
    // Initialize a new Grid instance
    var self = this;

    // console.log(self.collection.toJSON());

    var grid = new Backgrid.Grid({
      columns: self.columnasTabla,
      collection: self.collection,
    });

    // Render the grid and attach the Grid's root to your HTML document
    this.$el.append(grid.render().el);

    // Initialize the paginator
    var paginator = new Backgrid.Extension.Paginator({
      collection: self.collection
    });

    // Render the paginator
    this.$el.after(paginator.render().el);


    // Initialize a client-side filter to filter on the client
    // mode pageable collection's cache.
    var filter = new Backgrid.Extension.ClientSideFilter({
      collection: self.collection,
      fields: ['nombre_deporte']
    });

    // Render the filter
    this.$el.before(filter.render().el);

    // Add some space to the filter and move it to the right
    $(filter.el).css({float: "right", margin: "20px"});

  },

  addOne: function (reserva) {
    var reservaView = new ReservaView({ model: reserva });
    this.$el.append(reservaView.render().el);
  },

  mostrar: function () {
    this.$el.show();
  },

  ocultar: function () {
    this.$el.hide();
  },

  columnasTabla: [{
      name: "id", // The key of the model attribute
      label: "ID", // The name to display in the header
      editable: false, // By default every cell in a column is editable, but *ID* shouldn't be
      // Defines a cell type, and ID is displayed as an integer without the ',' separating 1000s.
      // cell: "string",
      sortable: true,
      cell: Backgrid.IntegerCell.extend({
        orderSeparator: ''
      })
    },
    {
      name: "nombre_deporte",
      label: "Deporte",
      editable: false,
      cell: "string",
      sortable: true
    },
    {
      name: "nombre_pista",
      label: "Pista",
      editable: false,
      cell: "string",
      sortable: true
    },
    {
      name: "fecha_pista",
      label: "Fecha",
      editable: false,
      cell: "date",
      sortable: true
    },
    {
      name: "inicio",
      label: "Hora",
      editable: false,
      cell: "string",
      sortable: true
    },
    {
      name: "luz",
      label: "Luz",
      editable: false,
      cell: "integer",
      sortable: true
    },
    {
      name: "anulado",
      label: "Estado",
      editable: false,
      cell: "integer",
      sortable: true
    },
    {
      name: "precio_pista",
      label: "Precio Pista en €",
      editable: false,
      cell: "string",
      sortable: true
    },
    {
      name: "precio_luz",
      label: "Precio Luz en €",
      editable: false,
      cell: "string",
      sortable: true
    }]


});
