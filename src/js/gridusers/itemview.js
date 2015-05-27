var Backbone   = require('backbone'),
	_          = require('underscore'),
    $          = require('jquery'),
    BaseView   = require('../gridusers/baseview'),
    UserPerfil   = require('../views/user-perfil');

module.exports = BaseView.extend({
    events: {
        'click': 'goFichaUser'
    },

    goFichaUser: function(event){
    	this.userPerfil = new UserPerfil({ model: this.model });
    	this.userPerfil.render();
    	this.userPerfil.mostrar();
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
});