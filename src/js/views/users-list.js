var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    Plantilla  = require('../partials/plantilla_users_tabla'),
    _          = require('underscore'),
    $          = require('jquery'),
    Filter  = require('../gridusers/modelfilterUsers'),
    FormView  = require('../gridusers/formview'),
    CollectionView  = require('../gridusers/collectionviewusers');


module.exports = Backbone.View.extend({
  el: $('#usuarios_list'),

  template: Handlebars.compile(Plantilla.usuarios_tabla),

  initialize: function () {
    this.listenTo(this.collection, "reset", this.resetear, this);
  },

  resetear: function () {
    this.$el.empty();
  },

  render: function () {
    var self = this;

    var flt = new Filter({collection: self.collection});

    console.log(flt.attributes);
    var inputView = new FormView({
        el: 'form',
        model: flt
    });

    var listView = new CollectionView({
        template: self.template,
        collection: flt.filtered
    });

    $('#usuarios_list').append(listView.render().el);
    $('#content').show();

  },

  mostrar: function () {
    this.$el.show();
    $('#content').show();
  },

  ocultar: function () {
    this.$el.hide();
    $('#content').hide();
  }


});
