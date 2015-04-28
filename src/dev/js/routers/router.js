var Backbone      = require('backbone'),

    Deportes      = require('../collections/deportes'),
    Calendarios   = require('../collections/calendarios'),

    Deporte       = require('../models/deporte'),
    Sesion        = require('../models/sesion'),
    Calendario    = require('../models/calendario'),
    Dia           = require('../models/dia'),

    DeportesView  = require('../views/deportes-list'),
    LoginView     = require('../views/login'),
    RegistroView  = require('../views/registro'),
    CalendarioView = require('../views/calendarios'),
    HeaderView    = require('../views/header'),
    DiaView       = require('../views/dia'),

    $             = require('jquery'),

    Moment        = require('moment');

module.exports = Backbone.Router.extend({
  routes: {
    "": "index",
    "login": "loadLogin",
    "registro": "loadRegistro",
    "reservas": "loadDeportes",
    "pistas/:idDeporte": "loadCalendar",
    "pistas/:idDeporte/:date": "loadCalendar",
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

    this.dia = new Dia();
    // this.diaView = new DiaView({ model: this.dia });

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
    var sesion = Sesion.getInstance();
    console.log('la sesion: ' ,sesion);
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

    if(sesionRol === '1') response = 'admin';
    else if(sesionRol === '0') response = 'user';

    return response;
  },

  index: function(args){
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

  // fetchData: function () {
  //   var self = this;

  //   // Load Data
  //   return $.getJSON('data.json').then(function (data) {
  //     self.jsonData = data;

  //     self.deportes.reset();
  //     self.calendarios.reset();
  //   });
  // },

  loadDeportes: function () {
    var self = this;

    this.deportes.reset();
    this.calendarios.reset();

    if(this.diaView !== undefined)this.diaView.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();

    this.headerView = new HeaderView({});

    // this.deportes.fetch();
    this.deportes.fetch({
          success: function(response){
                console.log("Success deportes");
          },
          error: function (collection, err) {
            console.log('error', collection, err);
          }
      });

    // if (Object.keys(this.jsonData).length === 0) {
    //   var self = this;

    //   this.fetchData().done(function () {
    //     self.addDeportes();
    //   });

    // } else {
    //   this.addDeportes();
    // }
  },

  // addDeportes: function () {
  //   for (var nameDeporte in this.jsonData) {
  //     if (this.jsonData.hasOwnProperty(nameDeporte)) {
  //           this.addDeporte(nameDeporte, this.jsonData[nameDeporte]);
  //     }
  //   }
  // },

  // addDeporte: function (nameDeporte, deporte) {
  //   this.deportes.add(new Deporte({
  //     nameDeporte: nameDeporte,
  //     precio: deporte.precio,
  //     pistas: deporte.pistas
  //   }));
  // },

  // fetchCalendar: function () {
  //   // to-do refactor, paluego
  // },

  loadCalendar: function (login, idDeporte, newFecha) {

    var self = this;

    console.log("newFecha "+ newFecha);

    this.deportes.reset();
    this.calendarios.reset();

    this.headerView = new HeaderView({});

    var fechaCalendario = Moment().format('YYYY-MM-DD');

    if(newFecha === null)newFecha = fechaCalendario;

    console.log('moment', fechaCalendario );

    // dia & datapicker
    this.dia.set({
      deporte: idDeporte,
      fecha: newFecha
    });

    this.diaView = new DiaView({ model: this.dia });
    this.diaView.mostrar();

    this.calendarios.fetch({
        data: {
          id: idDeporte,
          fecha_pista: newFecha
        },
        type: 'POST',
        success: function(response){
                console.log("Success calendario");
                console.log(response);
        }
    });

    // return $.getJSON('calendar.json').then(function (data) {

    //   self.jsonDataCalendario = data;

    //   for (var i = 0; i < data.pistas.length ; i++) {
    //     var miPista = data.ºpistas[i];

    //     self.calendarios.add(new Calendario({
    //       namePista: miPista.name,
    //       horas: miPista.horas,
    //       nameDeporte: nameDeporte,
    //       numeroPistas: data.pistas.length
    //     }));
    //   }
    // });
  }

});
