var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery');
    Plantilla  = require('../partials/plantilla__calendario');

module.exports = Backbone.View.extend({

  tagName: 'div',
  className: function (){
    var calendario = this.model.toJSON();
    var numeroPistas = calendario.numeroPistas;
    numeroPistas = (numeroPistas == 1)? 'simple' : 'doble';
    return 'tipo-calendario ' + numeroPistas;
  },

   events: {
    'click [data-estado="libre"]': 'probando'
  },

  probando: function (event) {
    alert('libree: ' + $(event.currentTarget).attr('data-hora'));
    console.log(this.model.toJSON().namePista);
    console.log(this.model.toJSON().nameDeporte);
  },


  template: Handlebars.compile(Plantilla.__calendario),


  initialize: function () {
    this.listenTo(this.model, "change", this.render, this);
  },

  render: function () {
    var calendario = this.model.toJSON();

    for (var i = 0; i < calendario.horas.length; i++) {
       // console.log(calendario.horas[i].estado);
       if(calendario.horas[i].estado > 0){
        calendario.horas[i].estado = 'ocupado';
       }else calendario.horas[i].estado = 'libre';
    };

    var html = this.template(calendario);
    this.$el.html(html);
    return this;
  },


});