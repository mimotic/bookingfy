var plantillas = plantillas || {};

plantillas.gestion_pista = '<div class="wrap wrap-pistas">'
			+ '<h3><i class="demo-icon icon-user">&#xe840;</i> Pistas</h3>'
			+'{{#each pistas}}'
			+ '<div class="clear"></div>'
			+ '<h4><i class="demo-icon icon-user">&#xe81b;</i> {{{nombre_deporte}}}</h4>'
			+ 'Nombre: <input data-validado="" data-tipo="nombre" data-pista="{{id_pista}}" id="pista{{id_pista}}" type="text" value="{{{nombre_pista}}}" required disabled>'
			+ '<br>Precio (€/h): <input data-validado="" data-tipo="precio_pista" data-pista="{{id_pista}}" id="precio{{id_pista}}" type="number" value="{{{precio_pista}}}" required disabled>'
			+ '<br>Luz (€/h): <input data-validado="" data-tipo="precio_luz" data-pista="{{id_pista}}" id="luz{{id_pista}}" type="number" value="{{{precio_luz}}}" required disabled>'
			+ '<span id="deletePista" data-pista={{id_pista}}><i class="demo-icon icon-user">&#xe811;</i></span>'
			+ '{{/each}}'
			+ '<div class="clear"></div>'
			+ '<a id="addpista" href="#"><i class="demo-icon icon-user">&#xe80b;</i></a>'
			+ '<div class="clear"></div>'
			+ '<div id="error" class="error pistaMal"></div>'
			+ '<div id="no-error" class="error pistaa"></div>'
			+ '<div class="clear"></div>'
			+ '</div>';

module.exports = plantillas;