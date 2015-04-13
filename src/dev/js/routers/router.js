var Backbone      = require('backbone'),
    Deportes      = require('../collections/deportes'),
    Pistas        = require('../collections/pistas'),
    Horas        = require('../collections/horas'),
    Deporte       = require('../models/deporte'),
    Pista         = require('../models/pista'),
    Hora         = require('../models/hora'),
    DeportesView  = require('../views/deportes-list'),
    PistasView    = require('../views/pistas-list'),
    LoginView     = require('../views/login'),
    CalendarioView    = require('../views/calendario-list'),
    $             = require('jquery');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "login": "loadLogin",
    "reservas": "loadDeportes",
    ":name": "loadPistas",
  },

  initialize: function () {
    var self = this;
    this.current = {};
    this.jsonData = {};
    this.jsonData2 = {};
    this.deportes = new Deportes();
    this.pistas = new Pistas();
    this.horas = new Horas();
    this.deporteslist = new DeportesView({ collection: this.deportes });
    this.pistaslist = new PistasView({ collection: this.pistas });
    this.calendariolist = new CalendarioView({ collection: this.horas });


    Backbone.history.start({pushState: true});
  },

  index: function(){
    this.login = new LoginView();
  },

  loadLogin: function(){
    this.login = new LoginView();
  },


  loadDeportes: function () {
    this.fetchData();
  },


  fetchData: function () {
    var self = this;

    // Load Data
    return $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      console.log(data);

      self.deportes.reset();
      self.pistas.reset();

      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          self.addDeporte(name, data[name]);
        }
      }

    });
  },

  addDeporte: function (name, deporte) {
    this.deportes.add(new Deporte({
      name: name,
      precio: deporte.precio,
      pistas: deporte.pistas
    }));
  },


  loadPistas: function(name){

    this.deportes.reset();

    if (Object.keys(this.jsonData).length === 0) {
      var self = this;

      this.fetchData().done(function () {
        self.addPistas(name);
      });

    } else {
      this.addPistas(name);
    }

    this.fetchDataCalendario();
  },

  addPistas: function (name) {
    this.pistas.reset();

    this.current.deporte = this.jsonData[name];
    this.current.deporte.pistas.forEach(this.addPista, this);
  },

  addPista: function (name) {
    var deporte = this.current.deporte;

    this.pistas.add(new Pista({
      name: name.name
    }));
  },


  fetchDataCalendario: function () {
    var self = this;

    this.horas.reset();

    // Load Data
    return $.getJSON('calendar.json').then(function (data) {
      self.jsonData2 = data;

      console.log(data);

      for (var name in data) {
        if (data.hasOwnProperty(name)) {
          self.addHora(name, data[name]);
        }
      }

    });
  },

  addHora: function (name, hora) {
    this.horas.add(new Hora({
      name: name,
      estado: hora.estado
    }));
  }

});
