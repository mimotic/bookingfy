var plantillas = plantillas || {};

plantillas.gestion_pista = '<div class="wrap">'
			+ '<h3>Pistas</h3>'
			+'{{#each pistas}}'
			+ '<div class="clear"></div>'
			+ '<i class="demo-icon icon-user in-inputs">&#xe83e;</i>'
			+ '<input data-validado="" id="pista{{id_pista}}" type="text" value="{{{nombre_pista}}}">'
			+ '<input data-validado="" id="precio{{id_pista}}" type="text" value="{{{precio_pista}}}">'
			+ '<input data-validado="" id="luz{{id_pista}}" type="text" value="{{{precio_luz}}}">'
			+ '<select id="deporte{{id_pista}}">'
			+ '{{#each deportes}}'
  			+ '<option value="{{id}}" {{seleccionado}}>{{nombre}}</option>'
  			+ '{{/each}}'
			+ '</select>'
			+ '<div class="clear"></div>'
			+ '{{/each}}'
			+ '</div>';

module.exports = plantillas;