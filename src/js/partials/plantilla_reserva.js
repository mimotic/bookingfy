var plantillas = plantillas || {};

plantillas.reserva = '<div id="inContentModal"><h2 class="text-center">{{nombre_pista}}</h2>'
			+'<p><strong>Precio pista:</strong> {{precio}} €</p>'
			+'<p><strong>Precio luz:</strong> {{precio_luz}} €</p>'
			+'<p><strong>Fecha reserva:</strong> {{fecha_pista}}</p>'
			+'<p><strong>Hora reserva:</strong> {{hora}}</p>'
			+'<p><label for="checkedluz"><i class="demo-icon icon-user icon_lucero">&#xe84f;</i></label><strong>¿Necesitará luz?</strong> <input type="checkbox" name="checkedluz" value="luz" id="checkedluz"><p>'
			+'<div class="modal-botones"><a id="confirmarReserva" class="confirm-modal" href="#"><i class="mimo-icon icon-user">&#xe801;</i> Reservar</a>'
			+'<a id="cerrarModal" class="cancel-modal" href="#"><i class="demo-icon icon-user">&#xe804;</i> Cancelar</a></div>'
			+'</div>';

module.exports = plantillas;