var Backbone      = require('backbone'),
    Deportes      = require('../collections/deportes'),
    Pistas        = require('../collections/pistas'),
    Deporte       = require('../models/deporte'),
    Pista         = require('../models/pista'),
    DeportesView  = require('../views/deportes-list'),
    $             = require('jquery');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function () {
    console.log('inicializacion');
    this.current = {};
    this.jsonData = {};
    this.deportes = new Deportes();
    this.pistas = new Pistas();
    this.deporteslist = new DeportesView({ collection: this.deportes });

    Backbone.history.start();
  },


  index: function () {
    console.log('dentro del index');
    this.fetchData();
  },


  fetchData: function () {
    var self = this;

    // Load Data
    return $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      console.log(data);

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
      precio: deporte.precio
    }));
  }



});
