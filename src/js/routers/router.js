var Backbone      = require('backbone'),

    Deportes      = require('../collections/deportes'),
    Calendarios   = require('../collections/calendarios'),
    ReservasUser  = require('../collections/reservas-usuario'),

    Deporte       = require('../models/deporte'),
    Sesion        = require('../models/sesion'),
    Calendario    = require('../models/calendario'),
    Dia           = require('../models/dia'),
    Perfil        = require('../models/perfil'),
    ReservaUser    = require('../models/reserva-usuario'),

    DeportesView  = require('../views/deportes-list'),
    LoginView     = require('../views/login'),
    RegistroView  = require('../views/registro'),
    CalendarioView = require('../views/calendarios'),
    HeaderView    = require('../views/header'),
    DiaView       = require('../views/dia'),
    PerfilView    = require('../views/perfil'),
    ReservasUserView = require('../views/reservas-list'),

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
    "perfil"  : "loadPerfil",
    "misreservas": "loadReservasUser",
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


    // init loader
    this.loader();

    // deportes
    this.jsonData = {};
    this.deportes = new Deportes();
    this.deportesView = new DeportesView({ collection: this.deportes });

    // calendario
    this.jsonDataCalendario = {};
    this.calendarios = new Calendarios();
    this.calendarioView = new CalendarioView({ collection: this.calendarios });

    this.reservasUser = new ReservasUser();
    this.reservasUserView = new ReservasUserView({ collection: this.reservasUser });

    this.dia = new Dia();



    // start html5 historial for Router
    Backbone.history.start({pushState: true});
  },

  execute: function(callback, args) {
    this.requireLogin(callback, args);
    // console.log( 'tipo login: ' + this.islogged());
    this.bodyClass();
  },

  bodyClass: function () {
    var isLogged = this.islogged();
    var bodyTag = $("body");

    // switch class from body
    if(isLogged == 'unlogged') bodyTag.removeClass( "inapp" ).addClass( "outapp" );
    else bodyTag.removeClass( "outapp" ).addClass( "inapp" );
  },

  loader: function () {

    var loading = $('#loading');
    var documento = $(document);
    var modalCalendario = $('#modalCalendario');


    documento.ajaxStart(function () {
      loading.show(0);
    });

    documento.ajaxComplete(function () {
      loading.fadeOut(500);
    });
  },

  requireLogin: function(callback, args) {
    var sesion = Sesion.getInstance();
    if (sesion.get('mail')) {
      args.unshift(true);
      callback.apply(this, args);
    } else {
      args.unshift(false);
      if (callback === this.loadLogin || callback === this.loadRegistro){
       callback.apply(this, args);
      }else{
        this.navigate('login', { trigger: true });
      }
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

  loadLogin: function(args, datosLogin){
    if(this.registro) this.registro.resetear();
    if(this.perfilView) this.perfilView.clean();
    if(args === true){
      this.loadDeportes();
    } else {
      if(this.headerView !== undefined){
          this.headerView.ocultar();
      }
      this.deportes.reset();
      this.calendarios.reset();
      this.reservasUser.reset();
      if(this.diaView !== undefined) this.diaView.ocultar();
      this.login = new LoginView( datosLogin );
    }
  },

  loadRegistro: function(args){
    if(this.login) this.login.resetear();
    if(this.perfilView) this.perfilView.clean();
    if(args === true){
      this.loadDeportes();
    } else{
      this.deportes.reset();
      this.calendarios.reset();
      this.reservasUser.reset();
      if(this.diaView !== undefined)this.diaView.ocultar();
      this.registro = new RegistroView();
    }

    this.customEvents();

  },

  customEvents: function(){

    var self = this;

    Backbone.Events.on('resetCalendar' , function(idDeporte, fecha){
      console.log('eventooo',idDeporte, fecha);

      self.calendarios.fetch({
          data: {
            id: idDeporte,
            fecha_pista: fecha
          },
          type: 'POST',
          success: function(response){
            // do something
          }
      });
    });


    Backbone.Events.on('loginSuccessful' , function(args){
      console.log('login args',args);
      Backbone.app.navigate("login", { trigger: false });
      self.loadLogin( false , args );

    });

  },


  loadDeportes: function () {
    var self = this;

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.perfilView) this.perfilView.clean();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();



    // this.deportes.fetch();
    this.deportes.fetch({
          success: function(response){
                // console.log("Success deportes");
          },
          error: function (collection, err) {
            // console.log('error', collection, err);
          }
      });

  },

  loadCalendar: function (login, idDeporte, newFecha) {

    var self = this;

    // console.log("newFecha "+ newFecha);

    self.customEvents();

    if(this.perfilView) this.perfilView.clean();
    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
        this.headerView = new HeaderView({});
    }

    var fechaCalendario = Moment().format('YYYY-MM-DD');

    if(newFecha === null) newFecha = fechaCalendario;

    // console.log('moment', fechaCalendario );

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
                // console.log("Success calendario");
                // console.log(response);
        }
    });

    this.calendarios.setFecha(newFecha);
  },

  loadPerfil: function () {

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
        this.headerView = new HeaderView({});
    }

    this.perfilView = new PerfilView({});


  },


  loadReservasUser: function () {
    var self = this;

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.perfilView) this.perfilView.clean();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();


    var sesion = Sesion.getInstance();
    var sesionId = sesion.get('id_usuario');

    // this.deportes.fetch();
    this.reservasUser.fetch({
        data: {
            id_usuario: sesionId
          },
          type: 'POST',
          success: function(response){
                // console.log("Success deportes");
          },
          error: function (collection, err) {
            // console.log('error', collection, err);
          }
      });

  }

});
