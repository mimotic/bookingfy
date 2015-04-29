var plantillas = plantillas || {};

plantillas.reserva = '<div><h2 class="text-center">{{nombre_pista}}</h2>'
			+'<p>Precio pista: {{precio}}</p>'
			+'<p>Precio luz: {{precio_luz}}</p>'
			+'<p>Fecha reserva: {{fecha_pista}}</p>'
			+'<p>Hora reserva: {{hora}}</p>'
			+'<a id="confirmarReserva" href="#">Reservar</a><br>'
			+'<a id="cerrarModal" href="#">Cancelar</a>'
			+'</div>';

module.exports = plantillas;