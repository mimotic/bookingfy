var Backbone = require('backbone'),
    Calendario    = require('../models/calendario');

module.exports = Backbone.Collection.extend({
  model: Calendario
});