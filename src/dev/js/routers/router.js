var Backbone      = require('backbone'),
    Deportes      = require('../collections/deportes'),
    Deporte       = require('../models/deporte'),
    Pista         = require('../models/pista'),
    Hora         = require('../models/hora'),
    DeportesView  = require('../views/deportes-list'),
    LoginView     = require('../views/login'),
    RegistroView     = require('../views/registro'),
    Sesion        = require('../models/sesion'),
    $             = require('jquery');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "login": "loadLogin",
    "registro": "loadRegistro",
    "reservas": "loadDeportes",
    "pistas/:nameDeporte": "loadPistas",
    "*path"  : "notFound"
  },

  notFound: function(path) {
    var msg = "Unable to find path: " + path;
    alert(msg);
  },

  initialize: function () {
    var self = this;
    this.current = {};
    this.jsonData = {};
    this.jsonData2 = {};
    this.deportes = new Deportes();
    this.pistas = new Pistas();
    this.horas = new Horas();
    this.horas2 = new Horas();
    this.deporteslist = new DeportesView({ collection: this.deportes });
    this.pistaslist = new PistasView({ collection: this.pistas });
    this.calendariolist = new CalendarioView({ collection: this.horas });
    this.calendariolist2 = new CalendarioView({ collection: this.horas2 });


    Backbone.history.start({pushState: true});
  },

  execute: function(callback, args) {
    this.requireLogin(callback, args);
  },

  requireLogin: function(callback, args) {
    console.log('Require login');
    var sesion = Sesion.getInstance();
    if (sesion.get('mail')) {
      args.unshift(true);
      callback.apply(this, args);
    } else {
      args.unshift(false);
      if (callback === this.loadLogin || callback === this.loadRegistro) callback.apply(this, args);
      else this.navigate('login', { trigger: true });
    }
  },


  index: function(args){
    console.log(["index", args]);
    if(args === true) this.loadDeportes();
    else this.login = new LoginView();
  },

  loadLogin: function(args){
    if(args === true) this.loadDeportes();
    else this.login = new LoginView();
  },

  loadRegistro: function(args){
    if(args === true) this.loadDeportes();
    else this.registro = new RegistroView();
  },


  fetchData: function () {
    var self = this;

    // Load Data
    return $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      console.log(data);

      self.deportes.reset();
      self.pistas.reset();

    });
  },



  loadDeportes: function () {
    this.deportes.reset();
    this.pistas.reset();
    this.horas.reset();
    this.horas2.reset();

    if (Object.keys(this.jsonData).length === 0) {
      var self = this;

      this.fetchData().done(function () {
        self.addDeportes();
      });

    } else {
      this.addDeportes();
    }
  },


  addDeportes: function () {
    for (var nameDeporte in this.jsonData) {
      if (this.jsonData.hasOwnProperty(nameDeporte)) {
            this.addDeporte(nameDeporte, this.jsonData[nameDeporte]);
      }
    }
  },

  addDeporte: function (nameDeporte, deporte) {
    this.deportes.add(new Deporte({
      nameDeporte: nameDeporte,
      precio: deporte.precio,
      pistas: deporte.pistas
    }));
  }



});
