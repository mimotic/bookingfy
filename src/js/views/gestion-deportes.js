var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_deporte'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_deportes'),

  template: Handlebars.compile(Plantilla.gestion_deporte),

  events: {
    "change input" :"changed",
    'dblclick input': 'converting',
    'blur input': 'descoverting',
    'touchstart input': 'converting',
    'click #deleteDeporte': 'deleteDeporte',
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

  changed: function(e){
    console.log('modificado deporte', e.currentTarget.id);
    console.log('modificado deporte', e.currentTarget.value);
  },

  deleteDeporte: function(e){

      var idDeporte = $(e.currentTarget).attr('data-deporte');

      console.log('iddeporte', idDeporte);

      var formValues = {
            id_deporte: idDeporte
        };

       $.ajax({
          url:'/api/eliminarDeporte',
          type:'POST',
          dataType:"json",
          data: formValues,
          success:function (data) {
              console.log(["Register request details: ", data]);
              console.log(data.msg);

              if(data.estado=="error") {
                $('.error').hide();
                $('#error').html(data.msg).slideDown().fadeOut(5000);

              } else {
                $('.error').hide();
                $('#no-error').html(data.msg).slideDown().fadeOut(5000);

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
