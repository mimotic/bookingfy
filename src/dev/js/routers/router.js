var Backbone      = require('backbone'),

    Deportes      = require('../collections/deportes'),
    Calendarios   = require('../collections/calendarios'),

    Deporte       = require('../models/deporte'),
    Sesion = require('../models/sesion'),
    Calendario = require('../models/calendario'),

    DeportesView  = require('../views/deportes-list'),
    LoginView     = require('../views/login'),
    RegistroView     = require('../views/registro'),
    CalendarioView     = require('../views/calendarios'),

    $             = require('jquery');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "login": "loadLogin",
    "registro": "loadRegistro",
    "reservas": "loadDeportes",
    "pistas/:nameDeporte": "loadCalendar",
    "*path"  : "notFound"
  },

  notFound: function(path) {
    var msg = "Unable to find path: " + path;
    alert(msg);
  },

  initialize: function () {

    // ambito clausura
    var self = this;
    this.current = {};

    // deportes
    this.jsonData = {};
    this.deportes = new Deportes();
    this.deporteslist = new DeportesView({ collection: this.deportes });

    // calendario
    this.jsonDataCalendario = {};
    this.calendarios = new Calendarios();
    this.calendarioView = new CalendarioView({ collection: this.calendarios });

    // start html5 historial for Router
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
      self.calendarios.reset();
    });
  },



  loadDeportes: function () {
    this.deportes.reset();
    this.calendarios.reset();

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
  },

  fetchCalendar: function () {
    // to-do refactor, paluego
  },

  loadCalendar: function (nameDeporte){

    var self = this;

    this.deportes.reset();
    this.calendarios.reset();


    return $.getJSON('calendar.json').then(function (data) {

      self.jsonDataCalendario = data;

      // console.log(data.pistas.length);

      for (var i = 0; i < data.pistas.length ; i++) {
        console.log(data.pistas);
        var miPista = data.pistas[i];

        self.calendarios.add(new Calendario({
          namePista: miPista.name,
          horas: miPista.horas,
          nameDeporte: nameDeporte,
          numeroPistas: data.pistas.length
        }));

      }

    });

  }

});
