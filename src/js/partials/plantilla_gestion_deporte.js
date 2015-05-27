var plantillas = plantillas || {};

plantillas.gestion_deporte = '<div class="wrap wrap-deportes">'
			+ '<h3 >Deportes</h3>'
			+'{{#each models}}'
			+ '<div class="clear"></div>'
			+ '<i class="demo-icon icon-user in-inputs">&#xe83e;</i>'
			+ '<input data-validado="" id="deporte{{id}}" type="text" name="" value="{{{nombre}}}" disabled>'
			+'{{/each}}'
			+ '</div>';

module.exports = plantillas;