var Backbone = require('backbone'),
	LocalStorage = require("backbone.localstorage");

module.exports = Backbone.Model.extend({
	localStorage: new LocalStorage("session")
});