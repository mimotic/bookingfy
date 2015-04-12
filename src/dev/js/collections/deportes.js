var Backbone = require('backbone'),
    Deporte    = require('../models/deporte');

module.exports = Backbone.Collection.extend({
  model: Deporte
});