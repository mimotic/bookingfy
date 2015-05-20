var Backbone   = require('backbone'),
	_          = require('underscore'),
    $          = require('jquery');

module.exports = Backbone.View.extend({

    render: function() {
        var html, $oldel = this.$el, $newel;

        html = this.html();
        $newel=$(html);

        this.setElement($newel);
        $oldel.replaceWith($newel);

        return this;
    }

});