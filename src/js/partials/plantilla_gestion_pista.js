var plantillas = plantillas || {};

plantillas.gestion_pista = '<div class="wrap wrap-pistas">'
			+ '<h3>Pistas</h3>'
			+'{{#each pistas}}'
			+ '<div class="clear"></div>'
			+ '<input data-validado="" id="pista{{id_pista}}" type="text" value="{{{nombre_pista}}}" required disabled>'
			+ '<input data-validado="" id="precio{{id_pista}}" type="number" value="{{{precio_pista}}}" required disabled>'
			+ '<input data-validado="" id="luz{{id_pista}}" type="number" value="{{{precio_luz}}}" required disabled>'
			+ '<select id="select-pistas{{id_pista}}">'
			+ '{{#each deportes}}'
  			+ '<option value="{{id}}" {{seleccionado}}>{{nombre}}</option>'
  			+ '{{/each}}'
			+ '</select>'
			+ '<div class="clear"></div>'
			+ '{{/each}}'
			+ '</div>';

module.exports = plantillas;