var Backbone      = require('backbone'),

    Deportes      = require('../collections/deportes'),
    DeportesAdmin = require('../collections/deportes-admin'),
    PistasAdmin = require('../collections/pistas-admin'),
    Calendarios   = require('../collections/calendarios'),
    ReservasUser  = require('../collections/reservas-usuario'),
    ReservasAdmin = require('../collections/reservas-admin'),
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
    BtnMenuResponsiveView  = require('../views/menu-responsive-buttom'),
    DiaViewBotones       = require('../views/dia-botones'),
    PerfilView    = require('../views/perfil'),
    PerfilViewBotones    = require('../views/back-botones'),
    ReservasUserView = require('../views/reservas-list'),
    ReservasAdminView = require('../views/reservas-list-admin'),
    UsuariosListView = require('../views/users-list'),
    StatsView     = require('../views/stats-admin'),
    UserPerfil   = require('../views/user-perfil'),
    Tiempo   = require('../views/eltiempo'),

    GestionDeportesView   = require('../views/gestion-deportes'),
    GestionPistasView   = require('../views/gestion-pistas'),

    $             = require('jquery'),
    Moment        = require('moment'),
    AttachFastClick = require('fastclick');

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
    "reservas-usuarios": "loadReservasAdmin",
    "nuevo-usuario": "loadNuevoUsuario",
    "usuarios": "loadUsers",
    "gestion": "loadGestion",
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

    var isLogged = this.islogged().toLowerCase();

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

    this.reservasAdmin = new ReservasAdmin();
    this.reservasAdminView = new ReservasAdminView({ collection: this.reservasAdmin });

    this.usuarios = new Usuarios();
    this.usuariosListView = new UsuariosListView({ collection: this.usuarios });

    this.dia = new Dia();
    this.tiempo = new Tiempo({});

    //this.userPerfil = new UserPerfil();

    this.gestiondeportes = new DeportesAdmin();
    this.gestionDeportesView = new GestionDeportesView({ collection: this.gestiondeportes });

    this.gestionpistas = new PistasAdmin();
    this.gestionPistasView = new GestionPistasView({ collection: this.gestionpistas });

    // boton menu responsive, only admin
    if(this.btnMenuResponsiveView === undefined) this.btnMenuResponsiveView  = new BtnMenuResponsiveView();

    // custom events
    if((typeof this.customEvents) == 'function') this.customEvents();

    AttachFastClick(document.body);

    // start html5 historial for Router
    Backbone.history.start({pushState: true});
  },

  execute: function(callback, args) {
    this.resetCollections();
    this.requireLogin(callback, args);
    this.bodyClass();
  },

  bodyClass: function () {
    var isLogged = this.islogged();
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
    if(window.userperfil !== undefined)window.userperfil.clean();
    this.reservasUserView.ocultar();
    this.usuariosListView.ocultar();
    this.gestionDeportesView.ocultar();
    this.gestionPistasView.ocultar();
    if(this.statsView !== undefined) this.statsView.ocultar();

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
    if (isAdmin === false){
      this.navigate('', { trigger: true });
      exit;
    }
  },

  customEvents: function(){

    var self = this;

    Backbone.Events.on('resetCalendar' , function(idDeporte, fecha){

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

      if(self.islogged() == 'user'){
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
        }else{
            self.reservasAdmin.fetch({
                success: function(response){
                    self.reservasAdminView.render();
                },
                error: function (collection, err) {
                  // console.log('error', collection, err);
                }
            });
        }

    });

    Backbone.Events.on('resetUsuarios' , function(){
        self.usuarios.fetch({
          success: function(response){
            self.usuariosListView.render();
          }
      });
    });

    Backbone.Events.on('loginSuccessful' , function(args){
      Backbone.app.navigate("login", { trigger: false });
      self.loadLogin( false , args );
    });

    Backbone.Events.on('clickAdminButtomMenu' , function(){
      self.headerView.toggleMenu();
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


  resetCollections: function(){
      this.deportes.reset();
      this.calendarios.reset();
      this.reservasUser.reset();
      this.reservasAdmin.reset();
      this.usuarios.reset();
      this.gestiondeportes.reset();
      this.gestionpistas.reset();
  },


  cleanViews: function(keep){

    this.resetCollections();

    this.tiempo.ocultar();
    if(this.userPerfil !== undefined)this.userPerfil.ocultar();
    this.reservasUserView.ocultar();
    this.usuariosListView.ocultar();
    this.gestionDeportesView.ocultar();
    this.gestionPistasView.ocultar();

    if(this.statsView !== undefined) this.statsView.ocultar();

    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();


    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();

  },


  render: function (view) {
        //Close the current view
        if (this.currentView) {
            this.currentView.remove();
        }

        //render the new view
        view.render();

        //Set the current view
        this.currentView = view;

        return this;
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
      // this.deportes.reset();
      // this.calendarios.reset();
      // this.reservasUser.reset();
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
      // this.deportes.reset();
      // this.calendarios.reset();
      // this.reservasUser.reset();
      if(this.diaView !== undefined) this.diaView.ocultar();
      if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();


      if(this.registro === undefined) this.registro = new RegistroView();
      this.registro.render();
    }

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

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

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

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();

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

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();

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

    if(this.perfilView) this.perfilView.clean();
    if(this.perfilViewBotones) this.perfilViewBotones.clean();

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();
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

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();
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

    if(this.islogged() == 'user'){
      if(this.perfilViewBotones) this.perfilViewBotones.render();
      else this.perfilViewBotones = new PerfilViewBotones({});
    }

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
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();

    this.reservasUserView.mostrar();

    if(this.perfilViewBotones) this.perfilViewBotones.render();
    else this.perfilViewBotones = new PerfilViewBotones({});

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();


    var sesion = Sesion.getInstance();
    var sesionId = sesion.get('id_usuario');

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



  loadReservasAdmin: function () {
    this.adminZone();

    var self = this;

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.perfilView) this.perfilView.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();
    // this.reservasAdmin.reset();

    this.reservasAdminView.mostrar();

    if(this.perfilViewBotones) this.perfilViewBotones.render();
    else this.perfilViewBotones = new PerfilViewBotones({});

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();

    this.reservasAdmin.fetch({
          success: function(response){
              self.reservasAdminView.render();
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

    if(this.perfilView) this.perfilView.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();
    // this.usuarios.reset();

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

  },



  loadGestion: function(){
    var self = this;

    if(this.headerView !== undefined){
        this.headerView.render();
        this.headerView.mostrar();
    }else{
      this.headerView = new HeaderView({});
    }

    if(this.perfilView) this.perfilView.clean();
    if(this.registroAdminView !== undefined) this.registroAdminView.ocultar();

    // this.deportes.reset();
    // this.calendarios.reset();
    // this.reservasUser.reset();
    // this.usuarios.reset();
    // this.gestiondeportes.reset();
    // this.gestionpistas.reset();

    if(this.diaView !== undefined) this.diaView.ocultar();
    if(this.diaViewBotones !== undefined) this.diaViewBotones.ocultar();

    if(typeof this.login == 'object') this.login.resetear();
    if(typeof this.registro == 'object') this.registro.resetear();

    this.gestiondeportes.fetch({
          success: function(response){
                // console.log("Success deportes");
                self.gestionDeportesView.mostrar();
                self.gestionDeportesView.render();
          },
          error: function (collection, err) {
            // console.log('error', collection, err);
          }
    });

    this.gestionpistas.fetch({
          success: function(response){
                // console.log("Success deportes");
                self.gestionPistasView.mostrar();
                self.gestionPistasView.render();
          },
          error: function (collection, err) {
            // console.log('error', collection, err);
          }
    });
  }

});
