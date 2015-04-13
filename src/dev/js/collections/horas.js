var Backbone = require('backbone'),
    Hora    = require('../models/hora');

module.exports = Backbone.Collection.extend({
  model: Hora
});