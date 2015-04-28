var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_datepicker'),
    Dia = require('../models/dia'),
    Moment     = require('moment');
    // app        = Backbone.app;

module.exports = Backbone.View.extend({

  el: $('#datepickerDay'),

  template: Handlebars.compile(Plantilla._datepicker),

  // events: {
  // },

  initialize: function () {
    this.render();
    this.setCalendar();
    console.log( this.getDate() );
    this.listenTo(this.model, "reset", this.resetear, this);
  },

  changeDateNow: function (date) {
    //$("#datePickerVal").val(data);
    console.log(date);
  },

  getDate: function(){
    var fecha = $('#placeDatepicker').datepicker('getDate');
    var formato = 'YYYY-MM-DD';

    var formatFecha = Moment( fecha ).format( formato );

    return formatFecha;
  },

  setCalendar: function () {
    var formato = 'YYYY-MM-DD';
    var hoy = Moment().format( formato );

    var idDeporte = this.model.get("deporte");
    console.log("id de deporte " + idDeporte);

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
      onSelect: function(date){
        //this.changeDateNow(date);
        // alert(date);
        Backbone.app.navigate("pistas/" + idDeporte + "/" + date, { trigger: true });
      }

    });
  },

  resetear: function () {
    this.$el.empty();
  },

  displayDatepicker: function (options) {
    $('#placeDatepicker').datepicker(options);
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    return this;
  }

});