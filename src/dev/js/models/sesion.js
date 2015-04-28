var Backbone = require('backbone');
var LocalStorage = require('backbone.localStorage');

    var Mysesion = Backbone.Model.extend({
         localStorage: new LocalStorage("sesion")
    });

module.exports = {
    instance: new Mysesion({ id: 1 }),

    // Static method
    getInstance: function () {
      this.instance.fetch();
      return this.instance;
    },

    setSesiondata: function(data){
      this.instance = new Mysesion({ id: 1 });
      this.instance.save(data);
    },

    destroySesion: function () {
      this.instance.destroy();
      this.instance.clear();
    }
};