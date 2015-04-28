var plantillas = plantillas || {};

plantillas.__calendario = '<div class="calendario"></div>'
			+ '<div class="calendario-list">'
			+ '<h2 class="text-center">{{nombre}}</h2>'
			+ '<ul class="comments">'
			+ '{{#each horas}}'
				+ '<li data-hora="{{inicio}}" data-estado="{{id_usuario}}" class="hora text-center">{{inicio}}</li>'
			+ '{{/each}}'
			+ '</ul>'
			+ '</div>';

module.exports = plantillas;