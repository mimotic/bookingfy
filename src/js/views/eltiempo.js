var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    Plantilla  = require('../partials/plantilla_tiempo'),
    Dia = require('../models/dia'),
    Moment     = require('moment');

  var API_WEATHER_KEY = "80114c7878f599621184a687fc500a12";

  var API_WEATHER_URL = "http://api.openweathermap.org/data/2.5/weather?APPID=" + API_WEATHER_KEY + "&";
  var API_WEATHER_WEEK_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?APPID=" + API_WEATHER_KEY + "&";

  var IMG_WATHER_URL = "http://openweathermap.org/img/w/";

module.exports = Backbone.View.extend({

  el: $('#eltiempo'),

  template: Handlebars.compile(Plantilla.tiempo),

  // events: {
  // },

  initialize: function () {
    this.getTiempo();
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function (tiempo) {
    // var tiempo = this.model.toJSON();
    var html = this.template(tiempo);
    this.$el.html(html);
    return this;
  },

  getTiempo: function(){
    var self = this;
    var lat = 40.439854;
    var lon = -3.834995;
    $.getJSON(API_WEATHER_WEEK_URL + "lat=" + lat + "&lon=" + lon + "&cnt=7&units=metric&mode=json",
      function getCurrentWeather(data){

        console.log(data);

        var cityWeather = {};
        // cityWeather.zone = data.name;
        // cityWeather.icon = IMG_WATHER_URL + data.weather[0].icon + ".png";
        // cityWeather.temp = data.main.temp - 272.15;
        // cityWeather.temp = cityWeather.temp.toFixed(0);

        cityWeather.zone = data.city.name;
        cityWeather.days = [];

        for(var i=0; i<data.list.length; i++){
          cityWeather.days[i] = {
                    temp : data.list[i].temp.day.toFixed(0),
                    icon: IMG_WATHER_URL + data.list[i].weather[0].icon + ".png",
                    date: Moment.unix(data.list[i].dt).format('DD-MM-YYYY')
          };
        };


        console.log(cityWeather);

        //render
        self.render(cityWeather);
      });
  },


  mostrar: function(){
    this.$el.show();
  },

  ocultar: function(){
    this.$el.hide();
  }

});