var plantillas = plantillas || {};

plantillas.tiempo = '<span>{{zone}}</span>'
			+'{{#each days}}'
			+'<p>{{date}}</p>'
			+'<p>{{temp}} ºC</p>'
			+'<img data-icon src="{{icon}}" alt="" class="weather-card_image">'
			+'{{/each}}';

module.exports = plantillas;