var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_datepicker'),
    Dia = require('../models/dia'),
    Moment     = require('moment');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#datepickerDay'),

  elparent: $('.calendariopick'),

  events: {
    'click misReservasUser2': 'algo'
  },

  template: Handlebars.compile(Plantilla._datepicker),

  initialize: function () {
    this.elparent.show();
    this.render();
    this.setCalendar();
  },

  algo: function(event) {
    event.preventDefault();
    console.log('click');

  },

  changeDateNow: function (date) {
    console.log(date);
  },

  getDate: function(){
    var fecha = $('#placeDatepicker').datepicker('getDate');
    var formato = 'YYYY-MM-DD';

    var formatFecha = Moment( fecha ).format( formato );

    return formatFecha;
  },

  setCalendar: function () {

    var self = this;

    var formato = 'YYYY-MM-DD';
    var formatoEs = 'DD-MM-YYYY';

    var idDeporte = this.model.get("deporte");
    var fecha = (fecha)? self.getDate():this.model.get("fecha");
    fecha = Moment(fecha).format( formato );
    fechaEs = Moment(fecha).format( formatoEs );

    this.displayDatepicker({
      closeText: 'Cerrar',
      prevText: '< ',
      nextText: ' >',
      currentText: 'ir a Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
      'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      weekHeader: 'Sm',
      dateFormat: 'yy-mm-dd',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      showButtonPanel: false,
      yearSuffix: '',
      minDate: 0,
      defaultDate: fecha,
      onSelect: function(date){
        Backbone.app.navigate("pistas/" + idDeporte + "/" + date, { trigger: true });
      }

    });
  },

  resetear: function () {
    this.$el.empty();
    this.elparent.hide();
  },

  displayDatepicker: function (options) {
    $('#placeDatepicker').datepicker(options);
  },

  render: function () {
    this.elparent.show();
    var dia = this.model.toJSON();
    var html = this.template(dia);
    this.$el.html(html);
    return this;
  },


  mostrar: function(){
    this.elparent.show();
    this.$el.show();
  },

  ocultar: function(){
    this.$el.html('');
    this.elparent.hide();
  }

});