var Backbone      = require('backbone'),

    Deportes      = require('../collections/deportes'),
    Calendarios   = require('../collections/calendarios'),
    ReservasUser  = require('../collections/reservas-usuario'),
    Usuarios      = require('../collections/usuarios'),

    Deporte       = require('../models/deporte'),
    Sesion        = require('../models/sesion'),
    Calendario    = require('../models/calendario'),
    Dia           = require('../models/dia'),
    Perfil        = require('../models/perfil'),
    ReservaUser    = require('../models/reserva-usuario'),

    DeportesView  = require('../views/deportes-list'),
    LoginView     = require('../views/login'),
    RegistroView  = require('../views/registro'),
    RegistroAdminView  = require('../views/registro-admin'),
    CalendarioView = require('../views/calendarios'),
    HeaderView    = require('../views/header'),
    DiaView       = require('../views/dia'),
    DiaViewBotones       = require('../views/dia-botones'),
    PerfilView    = require('../views/perfil'),
    PerfilViewBotones    = require('../views/back-botones'),
    ReservasUserView = require('../views/reservas-list'),
    UsuariosListView = require('../views/users-list'),
    StatsView     = require('../views/stats-admin'),
    UserPerfil   = require('../views/user-perfil'),
    Tiempo   = require('../views/eltiempo'),

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
    "reservas-usuarios": "loadReservasUser",
    "nuevo-usuario": "loadNuevoUsuario",
    "usuarios": "loadUsers",
    "estadisticas": "loadEstadisticas",
    "*path"  : "notFound"
  },

  notFound: function(login,path) {
    var msg = "La url: " + path + " no existe, se le redireccionará al inicio";
    alert(msg);
    this.navigate("", { trigger: true });
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

    this.usuarios = new Usuarios();
    this.usuariosListView = new UsuariosListView({ collection: this.usuarios });

    this.dia = new Dia();
    this.tiempo = new Tiempo({});

    this.userPerfil = new UserPerfil();

    // start html5 historial for Router
    Backbone.history.start({pushState: true});
  },

  execute: function(callback, args) {
    this.requireLogin(callback, args);
    this.bodyClass();
  },

  bodyClass: function () {
    var isLogged = this.islogged();
    console.log('rol',isLogged);
    var bodyTag = $("body");

    // switch class from body
    if(isLogged == 'unlogged') bodyTag.removeClass( "admin" ).removeClass( "inapp" ).addClass( "outapp" );
    else{
      if(isLogged == 'admin') bodyTag.removeClass( "outapp" ).addClass( "inapp admin" );
      else bodyTag.removeClass( "outapp" ).removeClass( "admin" ).addClass( "inapp" );
    }
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
    this.tiempo.ocultar();
    this.userPerfil.ocultar();
    this.reservasUserView.ocultar();
    this.usuariosListView.ocultar();
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

    if(Number(sesionRol) === 1) response = 'admin';
    else if(Number(sesionRol) === 0) response = 'user';

    return response;
  },

  adminZone: function() {
    var isAdmin = this.islogged() == 'admin';
    if (isAdmin === false) this.navigate('', { trigger: true });
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


    Backbone.Events.on('resetReservas' , function(){
        var sesion = Sesion.getInstance();
        var sesionId = sesion.get('id_usuario');

        // this.deportes.fetch();
        self.reservasUser.fetch({
            data: {
                id_usuario: sesionId
              },
              type: 'POST',
              success: function(response){
                  self.reservasUserView.render();
              },
              error: function (collection, err) {
                // console.log('error', collection, err);
              }
          });

    });


    Backbone.Events.on('loginSuccessful' , function(args){
      console.log('login args',args);
      Backbone.app.navigate("login", { trigger: false });
      self.loadLogin( false , args );
    });

    Backbone.Events.on('updateUserData' , function(args){
      if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
      }else{
        this.headerView = new HeaderView({});
      }
    });

    Backbone.Events.on('adminRegistroSuccessful' , function(args){
      Backbone.app.navigate("login", { trigger: false });
      alert(args.msg + ' --- ' + args.mail);
      self.navigate("", { trigger: true });
    });
  },

  index: function(args){
    if(args === true) this.loadDeportes();
    else this.login = new LoginView();
  },

  loadLogin: function(args, datosLogin){
    if(this.registro) this.registro.resetear();
    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();
    if(this.statsView !== undefined) this.statsView.ocultar();
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
      if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();
      this.login = new LoginView( datosLogin );
    }
  },

  loadRegistro: function(args){
    if(this.login) this.login.resetear();
    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();
    if(this.statsView !== undefined) this.statsView.ocultar();
    if(args === true){
      this.loadDeportes();
    } else{
      this.deportes.reset();
      this.calendarios.reset();
      this.reservasUser.reset();
      if(this.diaView !== undefined)this.diaView.ocultar();
      if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();
      this.registro = new RegistroView();
    }

    this.customEvents();

  },

  loadNuevoUsuario: function(args){
    var self = this;
    self.adminZone();

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.statsView !== undefined) this.statsView.ocultar();

    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    self.customEvents();

    self.registroAdminView = new RegistroAdminView();

  },

  loadEstadisticas: function(args){
    var self = this;
    self.adminZone();

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();
    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    self.statsView = new StatsView();
  },

  loadDeportes: function () {
    var self = this;

    if(this.tiempo !== undefined){
        this.tiempo = new Tiempo({});
        this.tiempo.mostrar();
    }else{
        this.tiempo = new Tiempo({});
    }

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();
    if(this.statsView !== undefined) this.statsView.ocultar();

    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

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
    if(this.perfilViewBotones) this.perfilViewBotones.clean();


    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

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
      fecha: newFecha,
      fechaEs: Moment(this.fecha).format('DD/MM/YYYY')
    });

    this.diaView = new DiaView({ model: this.dia });
    this.diaView.mostrar();

    this.diaViewBotones = new DiaViewBotones({
      deporte: 'deporte'
    });
    this.diaViewBotones.mostrar();

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

    this.customEvents();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
        this.headerView = new HeaderView({});
    }

    this.perfilView = new PerfilView({});
    if(this.perfilViewBotones) this.perfilViewBotones.render();
    else this.perfilViewBotones = new PerfilViewBotones({});

  },


  loadReservasUser: function () {

    this.customEvents();

    var self = this;

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.perfilView) this.perfilView.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();

    this.reservasUserView.mostrar();

    if(this.perfilViewBotones) this.perfilViewBotones.render();
    else this.perfilViewBotones = new PerfilViewBotones({});

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

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
              self.reservasUserView.render();
          },
          error: function (collection, err) {
            // console.log('error', collection, err);
          }
      });

  },



  loadUsers: function () {
    var self = this;

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    this.userPerfil.ocultar();

    if(this.perfilView) this.perfilView.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    this.deportes.reset();
    this.calendarios.reset();
    this.reservasUser.reset();
    this.usuarios.reset();

    this.usuariosListView.mostrar();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();

    this.usuarios.fetch({
        success: function(response){
          self.usuariosListView.render();
        },
        error: function (collection, err) {
        }
      });

  }

});
