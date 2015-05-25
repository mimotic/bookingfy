var plantillas = plantillas || {};

plantillas.gestion_pista = '<div class="wrap">'
			+ '<h3>Pistas</h3>'
			+'{{#each models}}'
			+ '<div class="clear"></div>'
			+ '<i class="demo-icon icon-user in-inputs">&#xe83e;</i>'
			+ '<input data-validado="" id="pista" type="text" name="" value="{{{nombre_pista}}}">'
			+ '<input data-validado="" id="pista" type="text" name="" value="{{{nombre_deporte}}}">'
			+ '<input data-validado="" id="pista" type="text" name="" value="{{{precio_pista}}}">'
			+ '<input data-validado="" id="pista" type="text" name="" value="{{{precio_luz}}}">'
			+ '<div class="clear"></div>'
			+ '{{/each}}'
			+ '</div>';

module.exports = plantillas;