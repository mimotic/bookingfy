var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    ui         = require('jquery-ui'),
    Plantilla  = require('../partials/plantilla_add_deporte'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#modalCalendario'),

  template: Handlebars.compile(Plantilla.add_deporte),

  events: {
    'click #anadirDeporte': 'anadirDeporte',
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
    var container = $("#modalCalendario > div");
    if (!container.is(e.target) && container.has(e.target).length === 0) self.cancelar(e);
  },

  render: function () {
  	// var reserva = this.model.toJSON();
    var html = this.template();
    this.$el.html(html).fadeIn();
    return this;
  },



  anadirDeporte: function(event){
  	event.preventDefault();
    var self = this;

        var nombre = $('#nombreDeporte').val();

          var formValues = {
            nombre: nombre
          };

          $.ajax({
                url:'/api/nuevoDeporte',
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