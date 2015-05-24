var plantillas = plantillas || {};

plantillas.anular = '<div><h2 class="text-center">Anulación de reserva</h2>'
			+'<p><strong>Id reserva:</strong> {{id_reserva}}</p>'
			+'<div class="modal-botones"><a id="anularReserva" href="#" class="cancel-modal"><i class="demo-icon icon-user">&#xe804;</i> Cancelar reserva</a>'
			+'<a id="cerrarModal" class="cancel-modal supercerrar" href="#"><i class="demo-icon icon-user">&#xe804;</i> Cerrar</a><div>'
			+'</div>';

module.exports = plantillas;