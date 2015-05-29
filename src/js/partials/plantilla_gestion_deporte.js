var plantillas = plantillas || {};

plantillas.gestion_deporte = '<div class="wrap wrap-deportes">'
			+ '<h3 >Deportes</h3>'
			+'{{#each models}}'
			+ '<div class="clear"></div>'
			+ '<i class="demo-icon icon-user in-inputs">&#xe83e;</i>'
			+ '<input data-validado="" id="deporte{{id}}" type="text" name="" value="{{{nombre}}}" disabled>'
			+ '<span id="deleteDeporte" data-deporte={{id}}><i class="demo-icon icon-user">&#xe811;</i></span>'
			+'{{/each}}'
			+ '<div class="clear"></div>'
			+ '<div id="error" class="error"></div>'
			+ '<div id="no-error" class="error"></div>'
			+ '</div>';

module.exports = plantillas;