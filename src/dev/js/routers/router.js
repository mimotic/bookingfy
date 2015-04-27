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
    HeaderView     = require('../views/header'),

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

    //header
    //this.headerView = new HeaderView({});

    // start html5 historial for Router
    Backbone.history.start({pushState: true});
  },

  execute: function(callback, args) {
    this.requireLogin(callback, args);
    console.log( 'tipo login: ' + this.islogged());
    this.bodyClass();
  },

  bodyClass: function () {
    var isLogged = this.islogged();
    var bodyTag = $("body");

    // switch class from body
    if(isLogged == 'unlogged') bodyTag.removeClass( "inapp" ).addClass( "outapp" );
    else bodyTag.removeClass( "outapp" ).addClass( "inapp" );
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

  islogged: function() {
    var response = 'unlogged';
    var sesion = Sesion.getInstance();
    var sesionRol = sesion.get('rol');

    if(sesionRol === 1) response = 'admin';
    else if(sesionRol === 0) reponse = 'user';

    return response;
  },

  index: function(args){
    console.log(["index", args]);
    if(args === true) this.loadDeportes();
    else this.login = new LoginView();
  },

  loadLogin: function(args){
    if(this.registro) this.registro.resetear();
    if(args === true) this.loadDeportes();
    else this.login = new LoginView();
  },

  loadRegistro: function(args){
    if(this.login) this.login.resetear();
    if(args === true) this.loadDeportes();
    else this.registro = new RegistroView();
  },

  fetchData: function () {
    var self = this;

    // Load Data
    return $.getJSON('data.json').then(function (data) {
      self.jsonData = data;

      console.log(data);

      self.deportes.resetear();
      self.calendarios.resetear();
    });
  },

  loadDeportes: function () {
    console.log( 'tipo login: ' + this.islogged());

    console.log(typeof this.deportes.resetear)

    if(typeof this.deportes.resetear == 'function') this.deportes.resetear();
    if(typeof this.calendarios.resetear == 'function') this.calendarios.resetear();
    if(typeof this.login.resetear == 'function') this.login.resetear();
    if(typeof this.registro.resetear == 'function') this.registro.resetear();

    this.headerView = new HeaderView({});


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

    this.deportes.resetear();
    this.calendarios.resetear();

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
