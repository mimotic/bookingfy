var plantillas = plantillas || {};

plantillas.gestion_deporte = '<div class="wrap wrap-deportes">'
			+ '<h3><i class="demo-icon icon-user">&#xe81b;</i> Deportes</h3>'
			+'{{#each models}}'
			+ '<div class="clear"></div>'
			+ '<i class="demo-icon icon-user">&#xe830;</i><input data-validado="" id="deporte{{id}}" data-deporte="{{id}}" type="text" name="" value="{{{nombre}}}" disabled>'
			+ '<span id="deleteDeporte" data-deporte={{id}}><i class="demo-icon icon-user">&#xe811;</i></span>'
			+'{{/each}}'
			+ '<div class="clear"></div>'
			+ '<a id="adddeporte" href="#"><i class="demo-icon icon-user">&#xe80b;</i></a>'
			+ '<div class="clear"></div>'
			+ '<div id="error" class="error"></div>'
			+ '<div id="no-error" class="error"></div>'
			+ '<div class="clear"></div>'
			+ '</div>';

module.exports = plantillas;