var Backbone   = require('backbone'),
	_          = require('underscore'),
    $          = require('jquery'),
    BaseView   = require('../gridusers/baseview');

module.exports = BaseView.extend({
    events: {
        'click': function() {
            console.log(this.model.get('id') + ' - ' + this.model.get('nombre'));
        }
    }
});