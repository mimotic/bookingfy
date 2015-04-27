var Backbone   = require('backbone'),
    _          = require('underscore'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_registro'),
    Validator = require('validator'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#registro'),

  events: {
    'click #doregister': 'register',
    'click #gologin': 'goLogin'
  },


  template: Handlebars.compile(Plantilla.registro),

  initialize: function () {
    // this.listenTo(this.model, "change", this.render, this);
    this.render();
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    return this;
  },

  resetear: function () {
    this.$el.empty();
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


  register: function(evt){
    if(evt) evt.preventDefault();

        var mensajesError = {};
        var printErrores = '';

        var url = '/api/nuevoUsuario',
            name = $('#reg_name'),
            surname = $('#reg_surname'),
            dni = $('#reg_dni'),
            expediente = $('#reg_expediente'),
            email = $('#reg_email'),
            pwd = $('#reg_pass');

        var formValues = {
            nombre: name.val(),
            apellidos: surname.val(),
            expediente: expediente.val(),
            dni: dni.val(),
            password: pwd.val(),
            mail: email.val()
        };

        var validar = this.inputEval(formValues);

        if(validar.validado === true){
            $.ajax({
                url:url,
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {
                    console.log(["Register request details: ", data]);

                    if(data.estado=="error") {  // If there is an error, show the error messages
                        // $('.alert-error').text(data.error.text).show();
                        $('#error').html(data.msg).slideDown();
                        //alert('ERROR: ' + data.msg);
                    }
                    else { // If not, send them back to the home page
                        // window.location.replace('#');
                        // alert(user.val() + ' esta dentro');
                        $('#error').html('registrado !!!').slideDown();
                        Backbone.app.navigate("login", { trigger: true });
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

            console.log(mensajesError);

        }
    },


  goLogin: function (event) {
    event.preventDefault();
    Backbone.app.navigate("login", { trigger: true });
  }

});