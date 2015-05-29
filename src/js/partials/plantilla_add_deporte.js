var plantillas = plantillas || {};

plantillas.add_deporte = '<div><h2 class="text-center">Añadir deporte</h2>'
			+ '<input id="nombreDeporte" class="inputDeporteSty" data-validado="" type="text" name="" value="" placeholder="Nombre Deporte">'
			+'<div class="modal-botones"><a id="anadirDeporte" href="#" class="confirm-modal"><i class="demo-icon icon-user">&#xe81b;</i> Añadir deporte</a>'
			+'<a id="cerrarModal" class="cancel-modal" href="#"><i class="demo-icon icon-user">&#xe804;</i> Cancelar</a><div>'
			+'</div>';

module.exports = plantillas;