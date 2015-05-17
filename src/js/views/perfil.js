var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    _          = require('underscore'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_perfil'),
    Sesion     = require('../models/sesion'),
    Validator = require('validator'),
    Sha1       = require('sha1'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#perfil'),

  template: Handlebars.compile(Plantilla.perfil),

  events: {
    'click #doactualizar': 'actualizarDatos',
    'click #actualizarUserData': 'updateUser'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  getUserData: function (){
    var sesion = Sesion.getInstance();
    var usuario = sesion.attributes;
    return usuario;
  },

  actualizarDatos: function (event) {
    if(event) event.preventDefault();
    $('#actualizarUsuarioModal').show();
  },

  clean: function () {
    this.$el.empty();
    return this;
  },

  render: function () {
    var usuario = this.getUserData();
    var html = this.template(usuario);
    this.$el.html(html);
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
        response.datos.password = (Validator.isLength(formData.password, 6))? true : 'La contraseña debe tener mínimo 6 caracteres';
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


  updateUser: function(evt){

        if(evt) evt.preventDefault();

        var self = this;
        var mensajesError = {};
        var printErrores = '';

        var url = '/api/actualizarUsuario',
            name = $('#reg_name'),
            surname = $('#reg_surname'),
            dni = $('#reg_dni'),
            expediente = $('#reg_expediente'),
            email = $('#reg_email'),
            pwd = $('#reg_pass_new'),
            id_usuario = $('#reg_id_usuario'),
            rol = $('#reg_rol_usuario');

        var formValues = {
            nombre: name.val(),
            apellidos: surname.val(),
            expediente: expediente.val(),
            dni: dni.val(),
            password: pwd.val(),
            mail: email.val(),
            id_usuario: id_usuario.val(),
            rol: rol.val()
        };



        var validar = this.inputEval(formValues);

        if(validar.validado === true){
            formValues.password = Sha1(formValues.password);
            console.log('formValues', formValues);

            $.ajax({
                url:url,
                type:'PUT',
                dataType:"json",
                data: formValues,
                success:function (data) {
                    console.log(["Register request details: ", data]);

                    if(data.estado=="error") {
                        $('.error').hide();
                        $('#error').html(data.msg).slideDown();
                    }
                    else {
                        $('.error').hide();
                        $('#no-error').html(data.msg).slideDown();

                        var usuario = {
                          id_usuario: formValues.id_usuario,
                          nombre: formValues.nombre,
                          apellidos: formValues.apellidos,
                          mail: formValues.mail,
                          rol: formValues.rol,
                          dni: formValues.dni,
                          expediente: formValues.expediente
                        };

                        Sesion.setSesiondata(usuario);

                        Backbone.Events.trigger('updateUserData');
                        // self.undelegateEvents();

                        // var args = {};

                        // args.mail = formValues.mail;
                        // args.msg = data.msg;

                        // Backbone.Events.trigger('loginSuccessful', args);
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

            $('#error').html(printErrores).slideDown();

            // console.log(mensajesError);

        }
    },

});