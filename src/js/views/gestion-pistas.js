var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_pista'),
    _          = require('underscore'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_pistas'),

  template: Handlebars.compile(Plantilla.gestion_pista),

  events: {
    "change input" :"changed",
    "change select" :"changed",
    'dblclick input': 'converting',
    'blur input': 'descoverting',
    'touchstart input': 'converting',
    'keydown': 'keyAction'
  },

  converting: function (e) {
    var elem = e.target;
    var elemData = $("#" + elem.id);
    elemData.removeAttr('disabled');
    elemData.focus();
  },

  descoverting: function (e) {
    console.log('blur !!');
    var elem = e.target;
    var elemData = $("#" + elem.id);
    elemData.attr({disabled: true});
  },

  keyAction: function(e) {
        var code = e.keyCode || e.which;
        if(code == 13) this.descoverting(e);
  },

  initialize: function () {
    // this.listenTo(this.collection, "add", this.addOne, this);
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var models = this.collection.toJSON();
    var pistas = models[0].pistas;

    for (var i = 0; i < pistas.length; i++) {
      var deportes = JSON.parse( JSON.stringify( models[0].deportes ) );

      for (var j = 0; j < deportes.length; j++) {
        if(deportes[j].id == pistas[i].id_deporte){
          pistas[i].deportes = deportes;
          pistas[i].deportes[j].seleccionado = "selected";
          break;
        }
      };
    };

    var html = this.template({pistas: pistas});
    this.$el.html(html);
    return this;
  },

  changed: function(e){
    console.log('modificada pista', e.currentTarget.id);
    console.log('modificada pista', e.currentTarget.value);
  },

  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }

});
