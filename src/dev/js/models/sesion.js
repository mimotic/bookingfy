var Backbone = require('backbone');
var LocalStorage = require('backbone.localStorage');


    var Mysesion = Backbone.Model.extend({

         localStorage: new LocalStorage("sesion")

    });

module.exports = {
    instance: new Mysesion({ id: 1 }),

    // Static method
    getInstance: function () {
        // "instance" can be "this.instance" (static property)
        // but it is better if it is private

        // if (!this.instance) {
            // this.instance = new Mysesion({ id: 1 });
            this.instance.fetch();
        // }
        console.log("get instance");
        console.log(this.instance);
        return this.instance;
    },

    setSesiondata: function(data){
      this.instance = new Mysesion({ id: 1 });
      this.instance.save(data);

      console.log("set sesion data");
      console.log(this.instance);
    }
};