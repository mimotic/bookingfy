var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_registro'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#registro'),

  events: {
    'click #doregister': 'register'
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


  register: function(evt){
    if(evt) evt.preventDefault();

        var url = '/api/nuevoUsuario';
        var name = $('#reg_name');
        var surname = $('#reg_surname');
        var dni = $('#reg_dni');
        var expediente = $('#reg_expediente');
        var email = $('#reg_email');
        var pwd = $('#reg_pass');
        console.log('Register in... ');
        var formValues = {
            nombre: name.val(),
            apellidos: surname.val(),
            expediente: expediente.val(),
            dni: dni.val(),
            password: pwd.val(),
            mail: email.val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Register request details: ", data]);

                if(data.estado=="error") {  // If there is an error, show the error messages
                    // $('.alert-error').text(data.error.text).show();
                    alert('ERROR: ' + data.msg);
                }
                else { // If not, send them back to the home page
                    // window.location.replace('#');
                    // alert(user.val() + ' esta dentro');
                    Backbone.app.navigate("reservas", { trigger: true });
                }
            }
        });

    },


  navigate: function () {
    // Backbone.app.navigate(this.model.get("name"), { trigger: true });
  }

});