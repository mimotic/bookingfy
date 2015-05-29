var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_deporte'),
    AddDeporteView  = require('../views/add-deporte'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_deportes'),

  template: Handlebars.compile(Plantilla.gestion_deporte),

  events: {
    "change .wrap-deportes input" :"updateDeporte",
    'dblclick input': 'converting',
    'blur input': 'descoverting',
    'touchstart input': 'converting',
    'click #deleteDeporte': 'deleteDeporte',
    'click #adddeporte': 'addDeporte',
    'keydown': 'keyAction'

  },

  converting: function (e) {
    var elem = e.target;
    var elemData = $("#" + elem.id);
    elemData.removeAttr('disabled');
    elemData.focus();
  },

  descoverting: function (e) {
    var elem = e.target;
    var elemData = $("#" + elem.id);
    elemData.attr({disabled: true});
  },

  keyAction: function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) this.descoverting(e);
  },

  initialize: function () {
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var models = {models: this.collection.toJSON()};
    var html = this.template(models);
    this.$el.html(html);
    return this;
  },

  addDeporte: function(e){
    if(e) e.preventDefault();

    this.addDeporteView = new AddDeporteView();
  },

  updateDeporte: function(e){

    if(e) e.preventDefault();

    var self = this;
    var mensajesError = {};
    var printErrores = '';

    var id_deporte = $(e.currentTarget).attr('data-deporte');
    var new_name_deporte = e.currentTarget.value;

    var formValues = {
      id_deporte: id_deporte,
      new_name_deporte: new_name_deporte
    };

    console.log('dataBorrarUser', formValues);

    $.ajax({
                url:'/api/modificarDeporte',
                type:'POST',
                dataType:"json",
                data: formValues,
                success:function (data) {

                    if(data.estado=="error") {
                        $('.error').hide();
                        $('#error').html(data.msg).slideDown().fadeOut(5000);
                    }
                    else {

                        Backbone.Events.trigger('resetGestion', data);
                    }
                }
            });

  },

  deleteDeporte: function(e){

      if(e) e.preventDefault();

      var idDeporte = $(e.currentTarget).attr('data-deporte');

      var formValues = {
            id_deporte: idDeporte
        };

       $.ajax({
          url:'/api/eliminarDeporte',
          type:'POST',
          dataType:"json",
          data: formValues,
          success:function (data) {

              if(data.estado=="error") {
                $('.error').hide();
                $('#error').html(data.msg).slideDown().fadeOut(5000);

              } else {
                $('.error').hide();
                $('#no-error').html(data.msg).slideDown().fadeOut(5000);

                Backbone.Events.trigger('resetGestion', data);
              }
          }
       });
  },

  mostrar: function(){
    this.$el.show();

  },

  ocultar: function(){
    this.$el.hide();
  }

});
