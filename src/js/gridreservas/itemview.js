var Backbone   = require('backbone'),
	_          = require('underscore'),
    $          = require('jquery'),
    Anular     = require('../models/anular-reserva'),
    AnularView = require('../views/anular'),
    BaseView   = require('../gridreservas/baseview');

module.exports = BaseView.extend({
    events: {
        'click [data-anulado="0"] span': 'anular'
    },


    anular: function (event) {
        var horaClicked = this.model.get('inicio');
        var idHoraClicked = this.model.get('id');
        var idReserva = this.model.get('id');
        var fechaPista = this.model.get('fecha_pista');
        var reserva = this.model.toJSON();

        this.anular = new Anular();

        this.anular.clear();

        this.anular.set({
            id_reserva: idReserva,
            id_hora: idHoraClicked,
            hora: horaClicked,
            fecha_pista: fechaPista
        });

        this.anularview = new AnularView({ model: this.anular });
      }
});