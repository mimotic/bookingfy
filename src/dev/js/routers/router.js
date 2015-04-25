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
    RegistroView     = require('../views/registro'),
    CalendarioView    = require('../views/calendario-list'),
    $             = require('jquery');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "login": "loadLogin",
    "registro": "loadRegistro",
    "reservas": "loadDeportes",
    "pistas/:nameDeporte": "loadPistas"
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
    console.log('nueva url ' + callback);
    // args.push(parseQueryString(args.pop()));
    if (callback) callback.apply(this, args);
  },


  index: function(){
    this.login = new LoginView();
  },

  loadLogin: function(){
    this.login = new LoginView();
  },

  loadRegistro: function(){
    this.registro = new RegistroView();
  },


  fetchData: function () {
    var self = this;

    // Load Data
    return $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      console.log(data);

      self.deportes.reset();
      self.pistas.reset();

      // for (var nameDeporte in data) {
      //   if (data.hasOwnProperty(nameDeporte)) {
      //     self.addDeporte(nameDeporte, data[nameDeporte]);
      //   }
      // }

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
  },


  loadPistas: function(nameDeporte){

    this.deportes.reset();
    this.horas.reset();
    this.horas2.reset();

    if (Object.keys(this.jsonData).length === 0) {
      var self = this;

      this.fetchData().done(function () {
        self.addPistas(nameDeporte);
      });

    } else {
      this.addPistas(nameDeporte);
    }
  },

  addPistas: function (nameDeporte) {
    this.pistas.reset();

    this.current.deporte = this.jsonData[nameDeporte];
    this.current.deporte.pistas.forEach(this.addPista, this);
  },

  addPista: function (name) {
    var deporte = this.current.deporte;

    this.pistas.add(new Pista({
      name: name.name
    }));

    this.fetchDataCalendario();
  },


  fetchDataCalendario: function () {
    var self = this;

    // this.horas.reset();

    return $.getJSON('calendar.json').then(function (data) {
      self.jsonData2 = data;

      console.log(data);

      var i=0;
      for (var name in data) {
        console.log("var name: " + name);
        if (data.hasOwnProperty(name)) {
          // self.addHora(name, data[name]);
          self.addCalendario(i, data[name]);
          i++;
        }
      }

    });
  },

  addCalendario: function(i, calendario){
    console.log("var i: " +i);
    for (var name in calendario) {
        // console.log("var name: " + name);
        if (calendario.hasOwnProperty(name)) {
          this.addHora(i, name, calendario[name]);
        }
      }
  },

  addHora: function (i, name, hora) {
    if(i==0){
      this.horas.add(new Hora({
        name: name,
        estado: hora.estado
      }));
    }else{
      this.horas2.add(new Hora({
        name: name,
        estado: hora.estado
      }));
    }
  }

});
