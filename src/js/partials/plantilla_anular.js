var plantillas = plantillas || {};

plantillas.anular = '<div><h2 class="text-center">Anulación de reserva</h2>'
			+'<p>Id reserva: {{id_reserva}}</p>'
			+'<a id="anularReserva" href="#">Cancelar reserva</a><br>'
			+'<a id="cerrarModal" href="#">Cerrar</a>'
			+'</div>';

module.exports = plantillas;