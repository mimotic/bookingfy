var Backbone   = require('backbone'),
	_          = require('underscore'),
    $          = require('jquery'),
    BaseView   = require('../grid/baseview');

module.exports = BaseView.extend({
    events: {
        'click': function() {
            console.log(this.model.get('first'));
        }
    }
});