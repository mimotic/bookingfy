var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    _          = require('underscore'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_perfil'),
    PlantillaAdmin  = require('../partials/plantilla_perfil_admin'),
    Sesion     = require('../models/sesion'),
    Validator = require('validator'),
    Sha1       = require('sha1'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#perfil'),

  template: Handlebars.compile(PlantillaAdmin.perfil_admin),

  events: {
    'click #doactualizar': 'updateUser',
    'click #doborrar': 'borrarUser'
  },

  initialize: function () {
   // this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  getUserData: function (){
    var sesion = Sesion.getInstance();
    var usuario = sesion.attributes;
    return usuario;
  },

  render: function () {
    Handlebars.registerHelper('ifCond', function(rol, options) {
      if(rol === '1') {
        return options.fn(this);
      }
      return options.inverse(this);
    });

    var usuario = this.model.toJSON();
    var html = this.template(usuario);
    this.$el.html(html);
    return this;
  },


  clean: function () {
    this.$el.empty();
    return this;
  },


  inputEval: function(formData) {

        var response = {
            datos: {},
            validado: false
        };
        var test = false;

        response.datos.mail = (Validator.isEmail(formData.mail))? true : 'email incorrecto';
        response.datos.nombre = (Validator.isLength(formData.nombre, 2))? true : 'El nombre debe tener mínimo 2 caracteres';
        response.datos.apellidos = (Validator.isLength(formData.apellidos, 2))? true : 'Los apellidos deben tener mínimo 2 caracteres';
        response.datos.dni = (this.dniEval(formData.dni))? true : 'DNI no válido';
        if (!Validator.isLength(formData.password, 0)) response.datos.password = (Validator.isLength(formData.password, 6))? true : 'La contraseña debe tener mínimo 6 caracteres';
        response.datos.expediente = (Validator.isLength(formData.expediente, 5))? true : 'El expediente debe tener mínimo 5 caracteres';

        test =   !(_.isString(response.datos.mail)) &&
                 !(_.isString(response.datos.nombre)) &&
                 !(_.isString(response.datos.apellidos)) &&
                 !(_.isString(response.datos.dni)) &&
                 !(_.isString(response.datos.password)) &&
                 !(_.isString(response.datos.expediente));

        response.validado = test;

        return response;
  },

  dniEval : function(dni){

      var numero,
        lett,
        letra,
        expresion_regular_dni,
        response = false;

    expresion_regular_dni = /^\d{8}[a-zA-Z]$/;

    if(expresion_regular_dni.test (dni) === true){
        numero = dni.substr(0,dni.length-1);
        lett = dni.substr(dni.length-1,1);
        numero = numero % 23;
        letra='TRWAGMYFPDXBNJZSQVHLCKET';
        letra=letra.substring(numero,numero+1);
        if (letra == lett.toUpperCase()) response = true;
    }

    return response;

  },

  keyAction: function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) this.register();
  },

  borrarUser:function(e) {

    if(e) e.preventDefault();

    var self = this;
    var mensajesError = {};
    var printErrores = '';

    var id_usuario = $('#reg_id_usuario');

    var formValues = {
      id_usuario: id_usuario.val()
    };

    console.log('dataBorrarUser', formValues);

    $.ajax({
                url:'/api/eliminarUsuario',
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {



                    if(data.estado=="error") {
                        $('.error').hide();
                        $('#error').html(data.msg).slideDown().fadeOut(5000);

                        console.log('dataBorrarUser ERROR', data.msg);
                    }
                    else {
                        $('.error').hide();
                        $('#no-error').html(data.msg).slideDown().fadeOut(5000);
                        console.log('dataBorrarUser ERROR', data.msg);
                        Backbone.Events.trigger('resetUsuarios');
                    }
                }
            });
  },


  updateUser: function(evt){

        if(evt) evt.preventDefault();

        var self = this;
        var mensajesError = {};
        var printErrores = '';

        var url = '/api/actualizarUsuarioAdmin',
            name = $('#reg_name'),
            surname = $('#reg_surname'),
            dni = $('#reg_dni'),
            expediente = $('#reg_expediente'),
            email = $('#reg_email'),
            pwd = $('#reg_pass_new'),
            pwdOld = $('#reg_pass_old'),
            id_usuario = $('#reg_id_usuario'),
            rol = '0';

        var isChecked = $('#rolAdmin').is(':checked');
        if (isChecked === true) {
          rol = '1';
        }

        console.log('id user', id_usuario.val());

        var formValues = {
            id_usuario: id_usuario.val(),
            nombre: name.val(),
            apellidos: surname.val(),
            expediente: expediente.val(),
            dni: dni.val(),
            password: pwd.val(),
            mail: email.val(),
            rol: rol
        };


        pwdOld.val('');
        pwd.val('');



        var validar = this.inputEval(formValues);

        if(validar.validado === true){

            if(formValues.password !== '') formValues.password = Sha1(formValues.password);
            else formValues = _.omit(formValues, 'password');

            // formValues.current_password = Sha1(formValues.current_password);

            console.log('formValues', formValues);

            $.ajax({
                url:url,
                type:'PUT',
                dataType:"json",
                data: formValues,
                success:function (data) {

                    if(data.estado=="error") {
                        $('.error').hide();
                        $('#error').html(data.msg).slideDown().fadeOut(5000);
                    }
                    else {
                        $('.error').hide();
                        $('#no-error').html(data.msg).slideDown().fadeOut(5000);

                        Backbone.Events.trigger('resetUsuarios');
                    }
                }
            });

        }else{

            mensajesError = _.omit(validar.datos, function(value, key, object) {
              return value === true;
            });

            printErrores = '<ul>';

            _.each(mensajesError, function(val){
                printErrores += '<li>' + val + "</li>";
            });

            printErrores += '<ul>';

            $('.error').hide();
            $('#error').html(printErrores).slideDown().fadeOut(5000);

            // console.log(mensajesError);

        }
    },

    mostrar: function(){
      this.$el.show();
    },

    ocultar: function(){
      this.$el.hide();
    }

});