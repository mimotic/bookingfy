var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_add_pista'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#modalCalendario'),

  template: Handlebars.compile(Plantilla.add_pista),

  events: {
    'click #anadirPista': 'anadirPista',
    'click #cerrarModal': 'cancelar',
    'click' : 'closeUp'
  },

  initialize: function () {
    this.render();
  },

  resetear: function () {
    this.$el.empty();
  },

  closeUp: function(e){
    var self = this;
    var container = $("#modalCalendario > div:first-child");
    if (!container.is(e.target) && container.has(e.target).length === 0) self.cancelar(e);
  },

  render: function () {
    var html = this.template(this.model);
    this.$el.html(html).fadeIn();
    return this;
  },



  anadirPista: function(event){
  	event.preventDefault();
    var self = this;

      var nombrePista = $('#nombrePista').val();
      var precioPista = $('#precioPista').val();
      var precioLuz = $('#precioLuz').val();

      var idDeporte = $('#select-deporte option:selected').val();

          var formValues = {
            nombre: nombrePista,
            id_deporte: idDeporte,
            precio_pista: precioPista,
            precio_luz: precioLuz
          };


          console.log(formValues);

          $.ajax({
                url:'/api/nuevaPista',
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {

                    if(data.estado=="error") {
                        $('#modalCalendario div').html('<span>'+data.msg+'</span>');

                          setTimeout(function(){
                            $('#modalCalendario').fadeOut();
                            self.undelegateEvents();
                          }, 1500);
                    }
                    else {

                       $('#modalCalendario div').html('<span>'+data.msg+'</span>');

                        $('#modalCalendario').fadeOut();

                        self.undelegateEvents();

                        Backbone.Events.trigger('resetGestion', data);
                    }
                }
            });

  },

  cancelar: function(event){
  	event.preventDefault();
  	$('#modalCalendario').fadeOut();
    this.undelegateEvents();
  }

});