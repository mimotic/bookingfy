var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    ReservaView  = require('../views/reserva-single'),
    Plantilla  = require('../partials/plantilla_reserva_user'),
    _          = require('underscore'),
    $          = require('jquery'),
    PageableCollection = require("backbone.paginator"),
    BackgridFilter = require('backgrid-filter'),
    Backgrid   = require('backgrid');

    PageableCollection = Backbone.PageableCollection;



module.exports = Backbone.View.extend({
  el: $('#reservas_user'),

  template: Handlebars.compile(Plantilla.reserva_user),

  initialize: function () {
    // console.log('pagination??',PageableCollection);
    // this.listenTo(this.collection, "add", this.render, this);
    // this.listenTo(this.collection, "reset", this.resetear, this);
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
      cell: "string",
      sortable: false
      // cell: Backgrid.IntegerCell.extend({
      //   orderSeparator: ''
      // })
    },
    {
      name: "nombre_deporte",
      label: "Deporte",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "nombre_pista",
      label: "Pista",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "fecha_pista",
      label: "Fecha",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "inicio",
      label: "Hora",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "luz",
      label: "Luz",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "anulado",
      label: "Estado",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "precio_pista",
      label: "Precio Pista en €",
      editable: false,
      cell: "string",
      sortable: false
    },
    {
      name: "precio_luz",
      label: "Precio Luz en €",
      editable: false,
      cell: "string",
      sortable: false
    }]


});
