var Backbone   = require('backbone'),
    Handlebars = require('handlebars'),
    $          = require('jquery'),
    app        = Backbone.app;

module.exports = Backbone.View.extend({
  el: $('#login'),

  // events: {
  //   'click': 'navigate'
  // },

  template: Handlebars.compile($("#login-template").html()),

  initialize: function () {
    // this.listenTo(this.model, "change", this.render, this);
    this.render();
  },

  render: function () {
    var html = this.template();
    this.$el.html(html);
    return this;
  },


  navigate: function () {
    // Backbone.app.navigate(this.model.get("name"), { trigger: true });
  }

});