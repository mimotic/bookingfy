var Backbone   = require('backbone'),
    _          = require('underscore'),
    Handlebars = require('handlebars'),
    Usuarios = require('../collections/usuarios'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_registro_admin'),
    Validator = require('validator'),
    Rickshaw = require('rickshaw'),
    Moment        = require('moment'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#statss'),

  events: {
    'click #doregister': 'register',
    'keydown': 'keyAction'
  },

  template: Handlebars.compile(Plantilla.registro_admin),

  initialize: function () {
    this.fetchStats();
  },

  render: function (fetchData) {

    // this.data = [ { x: 1910, y: 92228531 }, { x: 1920, y: 106021568 }, { x: 1930, y: 123202660 }, { x: 1940, y: 132165129 }, { x: 1950, y: 151325798 }, { x: 1960, y: 179323175 }, { x: 1970, y: 203211926 }, { x: 1980, y: 226545805 }, { x: 1990, y: 248709873 }, { x: 2000, y: 281421906 }, { x: 2010, y: 308745538 } ];
    var self = this;
    var dataOutput = fetchData;

    this.graph = new Rickshaw.Graph( {
          element: document.getElementById("#chart"),
          width: 300,
          height: 150,
          series: [
            {
              color: 'steelblue',
              data: dataOutput.reservas
            }
          ]
    } );

    var x_axis = new Rickshaw.Graph.Axis.Time( { graph: self.graph } );

    var y_axis = new Rickshaw.Graph.Axis.Y( {
            graph: self.graph,
            orientation: 'left',
            tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
            element: document.getElementById('y_axis'),
    } );

    this.graph.render();
    // http://stackoverflow.com/questions/18157333/backbone-js-best-practice-for-implementing-instant-search
    // var html = this.template();
    // this.$el.html(html);
    return this;
  },

  ocultar: function () {
    this.$el.empty();
  },

  generateData: function(dataAjax){

    var reservas = dataAjax.reservas;
    var response = {};
    response.reservas = [];

    for (var i = 0; i < reservas.length; i++) {

      response.reservas[i] = {
        x: Number(Moment(reservas[i].fecha).unix()),
        y: Number(reservas[i].total)
      };

    }

    console.log("estadisticas", response.reservas);

    return response;

    // [ { x: 0, y: 23}, { x: 1, y: 15 }, { x: 2, y: 79 } ]
  },

  fetchStats: function(){

        var self = this;
        var mensajesError = {};
        var printErrores = '';

        $.ajax({
            url:'/api/estadisticas',
            type:'GET',
            dataType:"json",
            success:function (data) {
                if(data.estado=="error") {
                    $('.error').slideDown();
                    $('#error').html(data.msg).slideDown();
                }
                else {

                  self.render(self.generateData(data));

                }
            }
        });
    }

});