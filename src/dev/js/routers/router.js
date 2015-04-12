var Backbone      = require('backbone'),
    Deportes      = require('../collections/deportes'),
    Pistas        = require('../collections/pistas'),
    Deporte       = require('../models/deporte'),
    Pista         = require('../models/pista'),
    DeportesView  = require('../views/deportes-list'),
    PistasView    = require('../views/pistas-list'),
    LoginView     = require('../views/login.js'),
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
    this.deportes = new Deportes();
    this.pistas = new Pistas();
    this.deporteslist = new DeportesView({ collection: this.deportes });
    this.pistaslist = new PistasView({ collection: this.pistas });



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
  }


});
