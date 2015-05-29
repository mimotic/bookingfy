var plantillas = plantillas || {};

plantillas.gestion_pista = '<div class="wrap wrap-pistas">'
			+ '<h3>Pistas</h3>'
			+'{{#each pistas}}'
			+ '<div class="clear"></div>'
			+ '<input data-validado="" data-tipo="nombre" data-pista="{{id_pista}}" id="pista{{id_pista}}" type="text" value="{{{nombre_pista}}}" required disabled>'
			+ '<input data-validado="" data-tipo="precio_pista" data-pista="{{id_pista}}" id="precio{{id_pista}}" type="number" value="{{{precio_pista}}}" required disabled>'
			+ '<input data-validado="" data-tipo="precio_luz" data-pista="{{id_pista}}" id="luz{{id_pista}}" type="number" value="{{{precio_luz}}}" required disabled>'
			+ '<select id="select-pistas{{id_pista}}">'
			+ '{{#each deportes}}'
  			+ '<option value="{{id}}" {{seleccionado}}>{{nombre}}</option>'
  			+ '{{/each}}'
			+ '</select>'
			+ '<span id="deletePista" data-pista={{id_pista}}><i class="demo-icon icon-user">&#xe811;</i></span>'
			+ '{{/each}}'
			+ '<div class="clear"></div>'
			+ '<div id="error" class="error"></div>'
			+ '<div id="no-error" class="error"></div>'
			+ '<div class="clear"></div>'
			+ '</div>';

module.exports = plantillas;