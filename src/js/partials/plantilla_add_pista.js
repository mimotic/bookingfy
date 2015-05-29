var plantillas = plantillas || {};

plantillas.add_pista = '<div><h2 class="text-center">Nueva Pista</h2>'
			+'<input id="nombrePista" data-validado="" type="text" placeholder="nombre" value="">'
			+'<input id="precioPista" data-validado="" type="text" placeholder="precio alquiler" value="">'
			+'<input id="precioLuz" data-validado="" type="text" placeholder="precio luz" value="">'
			+ '<select id="select-deporte">'
			+ '{{#each deportes}}'
  			+ '<option value="{{id}}">{{nombre}}</option>'
  			+ '{{/each}}'
			+ '</select>'
			+'<div class="modal-botones">'
			+'<a id="anadirPista" href="#" class="confirm-modal"><i class="demo-icon icon-user">&#xe840;</i> Añadir pista</a>'
			+'<a id="cerrarModal" class="cancel-modal" href="#"><i class="demo-icon icon-user">&#xe804;</i> Cerrar</a><div>'
			+'</div>';

module.exports = plantillas;