var plantillas = plantillas || {};

plantillas.__calendario = '<div class="calendario"></div>'
			+ '<div class="calendario-list">'
			+ '<h2 class="text-center"><i class="demo-icon">&#xe83f;</i> {{nombre}}'
			+ '<span class="precios_calendar"><i class="demo-icon">&#xe838;</i> {{precio_pista}}€ +'
			+ '<i class="demo-icon">&#xe84f;</i> {{precio_luz}}€</span></h2>'
			+ '<ul class="horasListado">'
			+ '{{#each horas}}'
			+ '<li data-hora="{{inicio}}" data-estado="{{id_usuario}}" class="hora text-center">'
			+ '{{inicio}}'
			+ '<span data-btn="{{id_usuario}}">'
			+ '<i class="demo-icon icon-other {{id_usuario}}">&#xe847;</i><i class="demo-icon icon-ko {{id_usuario}}">&#xe804;</i><i class="demo-icon icon-ok {{id_usuario}}">&#xe803;</i>'
			+ '</span>'
			+ '</li>'
			+ '{{/each}}'
			+ '</ul>'
			+ '</div>';

module.exports = plantillas;