var plantillas = plantillas || {};

plantillas.add_deporte = '<div><h2 class="text-center">Nuevo Deporte</h2>'
			+ '<input id="nombreDeporte" data-validado="" type="text" name="" value="">'
			+'<div class="modal-botones"><a id="anadirDeporte" href="#" class="confirm-modal"><i class="demo-icon icon-user">&#xe853;</i> Añadir deporte</a>'
			+'<a id="cerrarModal" class="cancel-modal supercerrar" href="#"><i class="demo-icon icon-user">&#xe804;</i> Cerrar</a><div>'
			+'</div>';

module.exports = plantillas;