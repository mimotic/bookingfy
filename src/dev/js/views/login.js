var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_login'),
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
        console.log('Loggin in... ');
        var formValues = {
            email: $('#login_user_input').val(),
            password: $('#login_pass_input').val()
        };

        $.ajax({
            url:url,
            type:'POST',
            dataType:"json",
            data: formValues,
            success:function (data) {
                console.log(["Login request details: ", data]);

                if(data.error) {  // If there is an error, show the error messages
                    // $('.alert-error').text(data.error.text).show();
                    alert('ERROR');
                }
                else { // If not, send them back to the home page
                    // window.location.replace('#');
                    alert(this.$("#login_user_input").val() + ' esta dentro');
                }
            }
        });


  },

  navigate: function () {
    // Backbone.app.navigate(this.model.get("name"), { trigger: true });
  }

});