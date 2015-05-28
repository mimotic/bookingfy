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
        if(window.userperfil!=undefined) {
            window.userperfil.resetear();
            window.userperfil.undelegateEvents();
        }

    	this.userPerfil = new UserPerfil({ model: this.model });
    	// window.userPerfil.render();
    	// window.userPerfil.mostrar();

        this.userPerfil.render();

        window.userperfil = this.userPerfil;

        $('html, body').animate({ scrollTop: 0 }, 'slow');
    }
});