var plantillas = plantillas || {};

plantillas.__calendario = '<div class="calendario"></div>'
			+ '<div class="calendario-list">'
			+ '<h2 class="text-center">{{namePista}}</h2>'
			+ '<ul class="comments">'
			+ '{{#each horas}}'
				+ '<li data-hora="{{hora}}" data-estado="{{estado}}" class="hora text-center">{{hora}}</li>'
			+ '{{/each}}'
			+ '</ul>'
			+ '</div>';

module.exports = plantillas;