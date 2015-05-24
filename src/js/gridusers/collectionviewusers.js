var Backbone   = require('backbone'),
    _          = require('underscore'),
    $          = require('jquery'),
    ItemView   = require('../gridusers/itemview'),
    BaseView   = require('../gridusers/baseview'),
    Moment     = require('moment');

module.exports = BaseView.extend({
	initialize: function(opts) {
        this.template = opts.template;
        this.listenTo(this.collection, 'reset', this.render);
	},
	html: function() {
        var models = this.collection.map(function (model) {
            return _.extend(model.toJSON(), {
                cid: model.cid
            });
        });

        models = models.map(function (model) {
            model.fecha_alta = Moment(model.fecha_alta).format('DD/MM/YYYY');
            return model;
        });

        return this.template({models: models});
	},
    render: function() {
        BaseView.prototype.render.call(this);

        var coll = this.collection;
        this.$('[data-cid]').each(function(ix, el) {
            new ItemView({
                el: el,
                model: coll.get($(el).data('cid'))
            });
        });

        return this;
    }
});