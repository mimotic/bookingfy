var plantillas = plantillas || {};

plantillas.gestion_pista = '<div class="wrap wrap-pistas">'
			+ '<h3>Pistas</h3>'
			+'{{#each pistas}}'
			+ '<div class="clear"></div>'
			+ '<input data-validado="" id="pista{{id_pista}}" type="text" value="{{{nombre_pista}}}" disabled>'
			+ '<input data-validado="" id="precio{{id_pista}}" type="text" value="{{{precio_pista}}}" disabled>'
			+ '<input data-validado="" id="luz{{id_pista}}" type="text" value="{{{precio_luz}}}" disabled>'
			+ '<select id="select-pistas{{id_pista}}">'
			+ '{{#each deportes}}'
  			+ '<option value="{{id}}" {{seleccionado}}>{{nombre}}</option>'
  			+ '{{/each}}'
			+ '</select>'
			+ '<div class="clear"></div>'
			+ '{{/each}}'
			+ '</div>';

module.exports = plantillas;