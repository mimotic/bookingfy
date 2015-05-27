var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_gestion_deporte'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

  el: $('#gestion_deportes'),

  template: Handlebars.compile(Plantilla.gestion_deporte),

  events: {
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
    var models = {models: this.collection.toJSON()};
    var html = this.template(models);
    this.$el.html(html);
    return this;
  },

  mostrar: function(){
    this.$el.show();

  },

  ocultar: function(){
    this.$el.hide();
  }

});
