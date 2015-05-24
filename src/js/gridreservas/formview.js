var Backbone   = require('backbone'),
	_          = require('underscore'),
    $          = require('jquery');

module.exports = Backbone.View.extend({
    events: {
        'keyup input[name="what"]': _.throttle(function(e) {
             this.model.set('what', e.currentTarget.value);
        }, 200) ,
        'click input[name="where"]': function(e) {
            this.model.set('where', e.currentTarget.value);
        }
    }
});