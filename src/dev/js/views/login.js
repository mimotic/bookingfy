var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_login'),
    Sha1       = require('sha1'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#login'),

  events: {
    'click #dologin': 'login'
  },

  template: Handlebars.compile(Plantilla.login),

  initialize: function () {
    // this.listenTo(this.model, "change", this.render, this);
    this.render();

   // Backbone.emulateHTTP = true;
    var Prueba;

    Prueba = new Usuarios().fetch();

    console.log(Prueba);
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    return this;
  },


  login: function(evt){
    if(evt) evt.preventDefault();

        var url = '/api/login';
        var user = $('#login_user_input');
        var pwd = $('#login_pass_input');
        console.log('Loggin in... ');
        var formValues = {
            mail: user.val(),
            password: Sha1(pwd.val())
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);

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